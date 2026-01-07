const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Hook to sign Windows executable with SSL.com CodeSignTool
 * @param {Object} configuration - Electron-builder configuration
 */
exports.default = async function (configuration) {
    // Only sign if we are packing for production (not during development testing if skipped)
    // However, electron-builder usually only calls this if "sign" is configured.

    const { path: filePath } = configuration;

    // Check if we have the necessary credentials
    if (!process.env.SSL_COM_USERNAME || !process.env.SSL_COM_PASSWORD || !process.env.SSL_COM_TOTP_SECRET) {
        console.warn('⚠️  Skipping Windows Code Signing: Missing SSL_COM_* environment variables.');
        return;
    }

    console.log(`🔐 Signing ${path.basename(filePath)} with SSL.com CodeSignTool...`);

    // Determine path to CodeSignTool
    // Check env var, or valid common locations
    let cstPath = process.env.CODE_SIGN_TOOL_PATH;

    if (!cstPath) {
        // Check common locations
        const commonPaths = [
            'C:\\Tools\\CodeSignTool',
            // In GitHub Actions, we will set this up in a specific folder
            path.join(process.cwd(), 'CodeSignTool'),
            path.join(process.cwd(), '..', 'CodeSignTool')
        ];

        for (const p of commonPaths) {
            if (fs.existsSync(p) && (fs.existsSync(path.join(p, 'CodeSignTool.bat')) || fs.existsSync(path.join(p, 'CodeSignTool.sh')))) {
                cstPath = p;
                break;
            }
        }
    }

    if (!cstPath) {
        console.error('❌ Error: Could not find CodeSignTool. Please set CODE_SIGN_TOOL_PATH or install it to C:\\Tools\\CodeSignTool');
        process.exit(1);
    }

    // Detect script extension based on platform (though we are likely on Windows for this hook)
    const isWin = process.platform === 'win32';
    const cmd = isWin ? 'CodeSignTool.bat' : 'CodeSignTool.sh';
    const cstCmd = path.join(cstPath, cmd);

    // Construct command
    // sign -username=<username> -password=<password> -totp_secret=<secret> -input_file_path=<file> -override=true
    // Note: We use -override=true to sign the file in place
    const args = [
        'sign',
        `-username="${process.env.SSL_COM_USERNAME}"`,
        `-password="${process.env.SSL_COM_PASSWORD}"`,
        `-totp_secret="${process.env.SSL_COM_TOTP_SECRET}"`,
        `-input_file_path="${filePath}"`,
        '-override=true'
    ];

    try {
        const fullCmd = `"${cstCmd}" ${args.join(' ')}`;
        // console.log(`   Executing: ${fullCmd.replace(process.env.SSL_COM_PASSWORD, '***').replace(process.env.SSL_COM_TOTP_SECRET, '***')}`);

        // Execute synchronously
        execSync(fullCmd, {
            stdio: 'inherit', // Stream output to console
            cwd: cstPath // Run from CST directory to be safe with dependencies
        });

        console.log(`✅ Successfully signed ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`❌ Failed to sign ${path.basename(filePath)}`);
        console.error(error);
        process.exit(1);
    }
};
