# ============================================================
# EasyBotChat Windows Code Signing Script
# Uses SSL.com eSigner (CodeSignTool) for EV Code Signing
# ============================================================

param(
    [string]$CodeSignToolPath = "C:\Tools\CodeSignTool",
    [switch]$SkipBuild,
    [switch]$Verbose
)

# Colors for output
function Write-Success { param($msg) Write-Host "[OK] $msg" -ForegroundColor Green }
function Write-Err { param($msg) Write-Host "[ERROR] $msg" -ForegroundColor Red }
function Write-Info { param($msg) Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Warn { param($msg) Write-Host "[WARN] $msg" -ForegroundColor Yellow }

# ============================================================
# Configuration
# ============================================================

$ProjectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$DistFolder = Join-Path $ProjectRoot "dist"
$EnvFile = Join-Path $ProjectRoot ".env.signing"

Write-Host ""
Write-Host "============================================" -ForegroundColor Magenta
Write-Host "  EasyBotChat Code Signing Script" -ForegroundColor Magenta
Write-Host "============================================" -ForegroundColor Magenta
Write-Host ""

# ============================================================
# Load Credentials
# ============================================================

Write-Info "Loading credentials..."

# Try loading from .env.signing file first
if (Test-Path $EnvFile) {
    Write-Info "Found .env.signing file"
    Get-Content $EnvFile | ForEach-Object {
        if ($_ -match "^\s*([^#][^=]+)=(.*)$") {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            # Remove surrounding quotes if present
            $value = $value -replace '^["'']|["'']$', ''
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
}

# Get credentials from environment
$Username = $env:SSL_COM_USERNAME
$Password = $env:SSL_COM_PASSWORD
$TotpSecret = $env:SSL_COM_TOTP_SECRET

# Validate credentials
$missingCreds = @()
if (-not $Username) { $missingCreds += "SSL_COM_USERNAME" }
if (-not $Password) { $missingCreds += "SSL_COM_PASSWORD" }
if (-not $TotpSecret) { $missingCreds += "SSL_COM_TOTP_SECRET" }

if ($missingCreds.Count -gt 0) {
    Write-Err "Missing required credentials:"
    foreach ($cred in $missingCreds) {
        Write-Host "   - $cred" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Please create a .env.signing file with:" -ForegroundColor Yellow
    Write-Host '   SSL_COM_USERNAME="your-email@example.com"' -ForegroundColor Gray
    Write-Host '   SSL_COM_PASSWORD="your-password"' -ForegroundColor Gray
    Write-Host '   SSL_COM_TOTP_SECRET="your-totp-secret"' -ForegroundColor Gray
    Write-Host ""
    Write-Host "Or set environment variables before running this script." -ForegroundColor Yellow
    exit 1
}

Write-Success "Credentials loaded for: $Username"

# ============================================================
# Validate CodeSignTool
# ============================================================

Write-Info "Checking CodeSignTool..."

$CodeSignToolBat = Join-Path $CodeSignToolPath "CodeSignTool.bat"
if (-not (Test-Path $CodeSignToolBat)) {
    Write-Err "CodeSignTool not found at: $CodeSignToolPath"
    Write-Host ""
    Write-Host "Please download CodeSignTool from SSL.com:" -ForegroundColor Yellow
    Write-Host "   https://www.ssl.com/download/codesigntool-for-windows/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Extract it to: $CodeSignToolPath" -ForegroundColor Yellow
    Write-Host "Or specify a custom path: .\sign-windows.ps1 -CodeSignToolPath 'C:\path\to\CodeSignTool'" -ForegroundColor Yellow
    exit 1
}

Write-Success "CodeSignTool found"

# ============================================================
# Build Application (optional)
# ============================================================

if (-not $SkipBuild) {
    Write-Host ""
    Write-Info "Building application..."
    
    Push-Location $ProjectRoot
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) {
            Write-Err "Build failed!"
            exit 1
        }
        Write-Success "Build completed"
    }
    finally {
        Pop-Location
    }
} else {
    Write-Warn "Skipping build (using existing dist folder)"
}

# ============================================================
# Find Executables to Sign
# ============================================================

Write-Host ""
Write-Info "Finding executables to sign..."

if (-not (Test-Path $DistFolder)) {
    Write-Err "Dist folder not found: $DistFolder"
    Write-Host "Please run 'npm run build' first." -ForegroundColor Yellow
    exit 1
}

$ExeFiles = Get-ChildItem -Path $DistFolder -Filter "*.exe" -File
if ($ExeFiles.Count -eq 0) {
    Write-Err "No .exe files found in dist folder"
    exit 1
}

Write-Success "Found $($ExeFiles.Count) executable(s) to sign:"
foreach ($exe in $ExeFiles) {
    Write-Host "   - $($exe.Name)" -ForegroundColor Gray
}

# ============================================================
# Sign Each Executable
# ============================================================

Write-Host ""
Write-Host "============================================" -ForegroundColor Magenta
Write-Host "  Signing Executables" -ForegroundColor Magenta
Write-Host "============================================" -ForegroundColor Magenta

$signedCount = 0
$failedCount = 0

foreach ($exe in $ExeFiles) {
    Write-Host ""
    Write-Info "Signing: $($exe.Name)"
    
    $signArgs = @(
        "sign"
        "-username=`"$Username`""
        "-password=`"$Password`""
        "-totp_secret=`"$TotpSecret`""
        "-input_file_path=`"$($exe.FullName)`""
        "-override=true"
    )
    
    if ($Verbose) {
        Write-Host "   Command: CodeSignTool.bat $($signArgs -join ' ')" -ForegroundColor Gray
    }
    
    Push-Location $CodeSignToolPath
    try {
        $output = & .\CodeSignTool.bat $signArgs 2>&1
        $exitCode = $LASTEXITCODE
        
        if ($Verbose -or $exitCode -ne 0) {
            Write-Host $output -ForegroundColor Gray
        }
        
        if ($exitCode -eq 0) {
            Write-Success "Signed: $($exe.Name)"
            $signedCount++
        } else {
            Write-Err "Failed to sign: $($exe.Name)"
            $failedCount++
        }
    }
    catch {
        Write-Err "Error signing $($exe.Name): $_"
        $failedCount++
    }
    finally {
        Pop-Location
    }
}

# ============================================================
# Summary
# ============================================================

Write-Host ""
Write-Host "============================================" -ForegroundColor Magenta
Write-Host "  Signing Complete" -ForegroundColor Magenta
Write-Host "============================================" -ForegroundColor Magenta
Write-Host ""

if ($signedCount -gt 0) {
    Write-Success "$signedCount file(s) signed successfully"
}
if ($failedCount -gt 0) {
    Write-Err "$failedCount file(s) failed to sign"
}

Write-Host ""
Write-Host "Signed files are in: $DistFolder" -ForegroundColor Cyan
Write-Host ""

# Verify signatures
Write-Info "Verifying signatures..."
foreach ($exe in $ExeFiles) {
    $sig = Get-AuthenticodeSignature -FilePath $exe.FullName
    if ($sig.Status -eq "Valid") {
        $signer = $sig.SignerCertificate.Subject
        Write-Success "$($exe.Name): Signed by $signer"
    } else {
        Write-Warn "$($exe.Name): $($sig.Status)"
    }
}

Write-Host ""

if ($failedCount -gt 0) {
    exit 1
}
