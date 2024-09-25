#!/bin/bash
set -e
if [ $# -eq 0 ] || [ "$1" = "frontend" ]; then
    cd frontend
    npm ci 
    ng build --configuration production 
    ng test --no-watch --browsers ChromeHeadless --code-coverage 
    ng lint frontend --format json --output-file eslint.json --eslint-config .eslintrc.json --force
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