
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME;

if (!SUPABASE_URL || !SUPABASE_KEY || !BUCKET_NAME) {
  console.error('Error: SUPABASE_URL, SUPABASE_SECRET_KEY, and SUPABASE_BUCKET_NAME must be set in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const version = packageJson.version;
const distDir = path.join(__dirname, '../dist');

async function uploadFile(filePath, destinationPath) {
  const fileContent = fs.readFileSync(filePath);
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(destinationPath, fileContent, {
      upsert: false, // Do not set it true
      contentType: 'application/octet-stream'
    });

  if (error) {
    console.error(`Failed to upload ${path.basename(filePath)}:`, error.message);
    process.exit(1);
  }
  console.log(`Uploaded ${path.basename(filePath)} to ${destinationPath}`);
}

async function main() {
  console.log(`Starting upload for version ${version} to bucket '${BUCKET_NAME}'...`);

  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory not found. Run build first.');
    process.exit(1);
  }

  const files = fs.readdirSync(distDir);
  console.log(`\nFound ${files.length} file(s) in dist directory`);

  // Filter for Windows artifacts commonly produced by electron-builder
  const artifactExtensions = ['.exe', '.msi', '.blockmap', '.yml'];

  const artifacts = files.filter(file => {
    return artifactExtensions.some(ext => file.endsWith(ext)) &&
      // Avoid uploading builder-debug.yml or other temp files if unnecessary
      !file.includes('builder-debug') &&
      !file.includes('builder-effective');
  });

  if (artifacts.length === 0) {
    console.warn('No artifacts found to upload.');
    console.log('\nFiles in dist directory:');
    files.forEach(f => console.log(`  - ${f}`));
    return;
  }

  console.log(`\nUploading ${artifacts.length} artifact(s):`);
  artifacts.forEach(f => {
    const stats = fs.statSync(path.join(distDir, f));
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`  - ${f} (${sizeMB} MB)`);
  });
  console.log('');

  for (const file of artifacts) {
    const filePath = path.join(distDir, file);
    // Structure: version/filename
    const destinationPath = `${version}/${file}`;
    await uploadFile(filePath, destinationPath);
  }

  console.log('\nAll uploads completed successfully.');
  console.log(`\nVersion ${version} is now staged in Supabase.`);
  console.log(`To release, run: git tag v${version} && git push origin v${version}`);
}

main();
