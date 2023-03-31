#!/bin/bash
if [ $# -eq 0 ] || [ "$1" = "frontend" ]; then
    cd frontend
    npm ci --legacy-peer-deps  || { echo 'npm ci failed' ; exit 1; }
    ng build --configuration production || { echo 'ng build failed' ; exit 1; }
    ng test --watch false --browsers ChromeHeadless --code-coverage|| { echo 'ng test failed' ; exit 1; }
    npx ng lint frontend --format json --output-file eslint.json || { echo 'ng lint failed' ; exit 1; }
    cd ..
fi
if [ $# -eq 0 ] ||  [ "$1" = "backend" ];
    then 
    cd backend
    npm ci --legacy-peer-deps || { echo 'npm ci failed' ; exit 1; }
    npm run grunt ts|| { echo 'grunt ts failed' ; exit 1; }
    npm test|| { echo 'npm test failed' ; exit 1; }
    npm run grunt eslint -- --format=json --output-file=eslint.json || { echo 'grunt eslint failed' ; exit 1; }
    cd ..
fi