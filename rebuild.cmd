cd frontend
npm ci --legacy-peer-deps
npm install coveralls
ng build --configuration production
ng test --watch false --browsers ChromeHeadless --code-coverage
codecov --disable=gcov
npx ng lint frontend --format json --output-file eslint.json
cd ../backend
npm ci --legacy-peer-deps
npm install coveralls
npm run grunt ts
npm test
codecov --disable=gcov 
npm run grunt eslint -- --format=json --output-file=eslint.json