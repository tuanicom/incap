@echo off
setlocal EnableDelayedExpansion
set "build_frontend=false"
set "build_backend=false"
set "build_all=false"

if "%1"=="" (
    set "build_all=true"
)
if /I "%1"=="frontend" (
    set "build_frontend=true"
)
if /I "%1"=="backend" (
    set "build_backend=true"
)
if /I "%1"=="all" (
    set "build_all=true"
)

echo Installing dependencies...
call :RunCommand npm ci --legacy-peer-deps
IF %errorlevel% NEQ 0 goto :eof

IF "%build_all%"=="true" (
    echo Building all apps with Nx...
    call :RunCommand npm run build
    call :RunCommand npm run coverage
    call :RunCommand npm run lint
)
IF "%build_frontend%"=="true" (
    echo Building frontend with Nx...
    call :RunCommand npm run frontend:build
    call :RunCommand npm run coverage:frontend
    call :RunCommand npm run lint:frontend
)
IF "%build_backend%"=="true" (
    echo Building backend with Nx...
    call :RunCommand npm run backend:build
    call :RunCommand npm run coverage:backend
    call :RunCommand npm run lint:backend
)

goto :eof

:RunCommand
echo ------------- Run command: %* -------------
call %*
IF %errorlevel% NEQ 0 (
    echo Command failed with error level %errorlevel%
    exit /b %errorlevel%
)
goto :eof
