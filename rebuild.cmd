@echo off
setlocal EnableDelayedExpansion
if /I "%1"=="" (
    set "build_frontend=true"
    set "build_backend=true"
)
if /I "%1"=="frontend" (
    set "build_frontend=true"
)
if /I "%1"=="backend" (
    set "build_backend=true"
)
IF "%build_frontend%"=="true" (
    cd frontend
    call npm ci 
    call ng build --configuration production
    call ng test --watch false --browsers ChromeHeadless --code-coverage
    call npx ng lint frontend --format json --output-file eslint.json
    cd ..
)
IF "%build_backend%"=="true" (
    cd backend
    call npm ci 
    call npm run grunt ts
    call npm test
    call npm run grunt eslint -- --format=json --output-file=eslint.json
    cd ..
)
