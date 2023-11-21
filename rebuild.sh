#!/bin/bash
set -e
if [ $# -eq 0 ] || [ "$1" = "frontend" ]; then
    cd frontend
    npm ci 
    ng build --configuration production 
    ng test --watch false --browsers ChromeHeadless --code-coverage 
    npx ng lint frontend --format json --output-file eslint.json
    cd ..
fi
if [ $# -eq 0 ] ||  [ "$1" = "backend" ];
    then 
    cd backend
    npm ci 
    npm run grunt ts 
    npm test 
    npm run grunt eslint -- --format=json --output-file=eslint.json
    cd ..
fi