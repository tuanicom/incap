@echo off
setlocal EnableDelayedExpansion
set "build_frontend=false"
set "build_backend=false"

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
    pushd frontend
    call :RunCommand npm ci 
    call :RunCommand ng build --configuration production 
    call :RunCommand ng test --no-watch --browsers ChromeHeadless --code-coverage 
    call :RunCommand ng lint frontend --format json --output-file eslint.json
    popd
)
IF "%build_backend%"=="true" (
    pushd backend
    call :RunCommand npm ci 
    call :RunCommand npm run build 
    call :RunCommand npm test 
    call :RunCommand npm run lint -- --format=json --output-file=eslint.json     
    popd
)
goto :eof

:RunCommand
echo ------------- Run command: %* -------------
call %*
IF %errorlevel% NEQ 0 cmd /k