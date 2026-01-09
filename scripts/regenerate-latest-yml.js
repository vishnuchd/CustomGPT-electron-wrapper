#!/usr/bin/env node

/**
 * Regenerate latest.yml with correct checksums after signing
 * This fixes the SHA512 mismatch issue in auto-updater
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const yaml = require('js-yaml');

const distDir = path.join(__dirname, '..', 'dist');
const packageJson = require('../package.json');

function calculateSHA512(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha512');
  hashSum.update(fileBuffer);
  return hashSum.digest('base64');
}

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function regenerateLatestYml() {
  console.log('\n🔄 Regenerating latest.yml with post-signing checksums...\n');

  const version = packageJson.version;
  const productName = packageJson.build.productName;
  const latestYmlPath = path.join(distDir, 'latest.yml');

  // Find the main installer (NSIS .exe)
  const installerFileName = `${productName}-${version}.exe`;
  const installerPath = path.join(distDir, installerFileName);
  const blockMapPath = `${installerPath}.blockmap`;

  if (!fs.existsSync(installerPath)) {
    console.error(`❌ Error: Installer not found at ${installerPath}`);
    process.exit(1);
  }

  console.log(`📦 Found installer: ${installerFileName}`);

  // Calculate checksums
  const sha512 = calculateSHA512(installerPath);
  const size = getFileSize(installerPath);
  const sizeMB = (size / (1024 * 1024)).toFixed(2);

  console.log(`   Size: ${sizeMB} MB`);
  console.log(`   SHA512: ${sha512.substring(0, 32)}...`);

  // Read existing latest.yml or create new one
  let latestYml;
  if (fs.existsSync(latestYmlPath)) {
    const existingContent = fs.readFileSync(latestYmlPath, 'utf8');
    latestYml = yaml.load(existingContent);
    console.log('\n📄 Updating existing latest.yml');
  } else {
    console.log('\n📄 Creating new latest.yml');
    latestYml = {
      version: version,
      releaseDate: new Date().toISOString(),
    };
  }

  // Update with correct values
  latestYml.version = version;
  latestYml.files = [
    {
      url: installerFileName,
      sha512: sha512,
      size: size
    }
  ];
  latestYml.path = installerFileName;
  latestYml.sha512 = sha512;
  latestYml.releaseDate = new Date().toISOString();

  // Write updated latest.yml
  const yamlContent = yaml.dump(latestYml, {
    lineWidth: -1, // Don't wrap lines
    noRefs: true
  });

  fs.writeFileSync(latestYmlPath, yamlContent, 'utf8');
  console.log(`✅ Successfully regenerated latest.yml`);
  console.log(`   Path: ${latestYmlPath}\n`);

  // Verify the file
  const verification = yaml.load(fs.readFileSync(latestYmlPath, 'utf8'));
  console.log('📋 Verification:');
  console.log(`   Version: ${verification.version}`);
  console.log(`   SHA512: ${verification.sha512.substring(0, 32)}...`);
  console.log(`   Size: ${(verification.size / (1024 * 1024)).toFixed(2)} MB\n`);

  console.log('✅ latest.yml is now in sync with signed installer!\n');
}

try {
  regenerateLatestYml();
} catch (error) {
  console.error('❌ Error regenerating latest.yml:', error.message);
  console.error(error);
  process.exit(1);
}

