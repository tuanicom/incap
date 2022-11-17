cd frontend
call npm ci --legacy-peer-deps 
call npm install codecov snyk @angular/cli -g
call ng build --configuration production
call ng test --watch false --browsers ChromeHeadless --code-coverage
call codecov --disable=gcov
call npx ng lint frontend --format json --output-file eslint.json
cd ..\backend
call npm ci --legacy-peer-deps
call npm run grunt ts
call npm test
call codecov --disable=gcov 
call npm run grunt eslint -- --format=json --output-file=eslint.json