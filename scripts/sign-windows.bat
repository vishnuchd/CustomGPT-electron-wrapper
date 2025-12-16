@echo off
REM ============================================================
REM EasyBotChat Windows Code Signing Script (Batch Version)
REM Uses SSL.com eSigner (CodeSignTool) for EV Code Signing
REM ============================================================

echo.
echo ============================================
echo   EasyBotChat Code Signing Script
echo ============================================
echo.

REM Configuration - Update these paths as needed
set CODESIGNTOOL_PATH=C:\Tools\CodeSignTool
set PROJECT_ROOT=%~dp0..
set DIST_FOLDER=%PROJECT_ROOT%\dist

REM Check if credentials are set
if "%SSL_COM_USERNAME%"=="" (
    echo ERROR: SSL_COM_USERNAME environment variable not set
    echo.
    echo Please set the following environment variables:
    echo   set SSL_COM_USERNAME=your-email@example.com
    echo   set SSL_COM_PASSWORD=your-password
    echo   set SSL_COM_TOTP_SECRET=your-totp-secret
    echo.
    exit /b 1
)

if "%SSL_COM_PASSWORD%"=="" (
    echo ERROR: SSL_COM_PASSWORD environment variable not set
    exit /b 1
)

if "%SSL_COM_TOTP_SECRET%"=="" (
    echo ERROR: SSL_COM_TOTP_SECRET environment variable not set
    exit /b 1
)

echo Credentials loaded for: %SSL_COM_USERNAME%

REM Check CodeSignTool exists
if not exist "%CODESIGNTOOL_PATH%\CodeSignTool.bat" (
    echo ERROR: CodeSignTool not found at %CODESIGNTOOL_PATH%
    echo.
    echo Download from: https://www.ssl.com/download/codesigntool-for-windows/
    exit /b 1
)

echo CodeSignTool found at: %CODESIGNTOOL_PATH%

REM Check dist folder exists
if not exist "%DIST_FOLDER%" (
    echo ERROR: Dist folder not found. Run 'npm run build' first.
    exit /b 1
)

echo.
echo ============================================
echo   Signing Executables
echo ============================================

REM Sign each .exe file in dist folder
for %%f in ("%DIST_FOLDER%\*.exe") do (
    echo.
    echo Signing: %%~nxf
    
    pushd "%CODESIGNTOOL_PATH%"
    call CodeSignTool.bat sign -username="%SSL_COM_USERNAME%" -password="%SSL_COM_PASSWORD%" -totp_secret="%SSL_COM_TOTP_SECRET%" -input_file_path="%%f" -override=true
    
    if errorlevel 1 (
        echo FAILED: %%~nxf
    ) else (
        echo SUCCESS: %%~nxf
    )
    popd
)

echo.
echo ============================================
echo   Signing Complete
echo ============================================
echo.
echo Signed files are in: %DIST_FOLDER%
echo.

