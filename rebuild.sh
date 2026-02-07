#!/bin/bash
set -e
if [ $# -eq 0 ] || [ "$1" = "frontend" ]; then
    cd frontend
    npm ci 
    ng build --configuration production 
    ng test --no-watch --coverage 
    ng lint frontend --format json --output-file eslint.json --eslint-config .eslintrc.json --force
    cd ..
fi
if [ $# -eq 0 ] ||  [ "$1" = "backend" ];
    then 
    cd backend
    npm ci 
    npm run build 
    npm test -- --coverage
    npm run lint -- --format=json --output-file=eslint.json
    cd ..
fi