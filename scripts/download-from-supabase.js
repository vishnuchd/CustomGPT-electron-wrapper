require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME;

if (!SUPABASE_URL || !SUPABASE_KEY || !BUCKET_NAME) {
    console.error('Error: SUPABASE_URL, SUPABASE_SECRET_KEY, and SUPABASE_BUCKET_NAME must be set');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
// Use VERSION from env (set by GitHub Actions) or fallback to package.json
const version = process.env.VERSION || packageJson.version;
const distDir = path.join(__dirname, '../dist');

async function downloadFile(remotePath, localPath) {
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .download(remotePath);

    if (error) {
        console.error(`Failed to download ${remotePath}:`, error.message);
        throw error;
    }

    // Convert blob to buffer and write to file
    const arrayBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(localPath, buffer);

    const fileSizeMB = (buffer.length / (1024 * 1024)).toFixed(2);
    console.log(`Downloaded ${path.basename(localPath)} (${fileSizeMB} MB)`);
}

async function listVersionFiles() {
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(version, {
            limit: 100,
            offset: 0,
        });

    if (error) {
        console.error(`Failed to list files for version ${version}:`, error.message);
        throw error;
    }

    return data || [];
}

async function main() {
    console.log(`Starting download for version ${version} from bucket '${BUCKET_NAME}'...`);

    // Create dist directory if it doesn't exist
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
        console.log(`Created dist directory: ${distDir}`);
    }

    // List all files for this version
    const files = await listVersionFiles();

    if (files.length === 0) {
        console.error(`Error: No files found for version ${version} in bucket ${BUCKET_NAME}`);
        console.error(`Make sure you've uploaded this version first using: npm run build:win:upload`);
        process.exit(1);
    }

    console.log(`Found ${files.length} file(s) to download:`);
    files.forEach(f => console.log(`  - ${f.name}`));

    // Download each file
    let successCount = 0;
    let failCount = 0;

    for (const file of files) {
        const remotePath = `${version}/${file.name}`;
        const localPath = path.join(distDir, file.name);

        try {
            await downloadFile(remotePath, localPath);
            successCount++;
        } catch (err) {
            console.error(`Failed to download ${file.name}`);
            failCount++;
        }
    }

    console.log(`\nDownload Summary:`);
    console.log(`  Success: ${successCount}`);
    console.log(`  Failed: ${failCount}`);

    if (failCount > 0) {
        console.error('Some downloads failed.');
        process.exit(1);
    }

    console.log('\nAll downloads completed successfully.');
}

main();
