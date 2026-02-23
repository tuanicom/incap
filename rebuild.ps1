param(
    [string]$Target = "all"
)

# Build script using Nx monorepo
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm ci --legacy-peer-deps
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if ($Target -eq "all" -or $Target -eq "") {
    Write-Host "Building all apps with Nx..." -ForegroundColor Cyan
    npm run build
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    
    npm run test
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    
    npm run lint
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
elseif ($Target -eq "frontend") {
    Write-Host "Building frontend with Nx..." -ForegroundColor Cyan
    npx nx build frontend
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    
    npx nx test frontend
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    
    npx nx lint frontend
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
elseif ($Target -eq "backend") {
    Write-Host "Building backend with Nx..." -ForegroundColor Cyan
    npx nx build backend
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    
    npx nx test backend
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    
    npx nx lint backend
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
else {
    Write-Host "Usage: .\rebuild.ps1 [all|frontend|backend]" -ForegroundColor Yellow
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green