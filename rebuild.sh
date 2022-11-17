cd frontend
npm ci --legacy-peer-deps
npm install coveralls --no-save
ng build --configuration production
ng test --watch false --browsers ChromeHeadless --code-coverage
if [[ -z "${TRAVIS_JOB_ID+x}" ]]; then
    :
else
    export COVERALLS_SERVICE_JOB_ID=$TRAVIS_JOB_ID-frontend
    cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js;  
fi
if [[ -z "${CODACY_PROJECT_TOKEN+x}" ]]; then
    :
else
    bash <(curl -Ls https://coverage.codacy.com/get.sh) report -r ./coverage/lcov.info;
fi
npx ng lint frontend --format json --output-file eslint.json
cd ../backend
npm ci --legacy-peer-deps
npm install coveralls --no-save
npm run grunt ts
npm test
if [[ -z "${TRAVIS_JOB_ID+x}" ]]; then
    :
else
    export COVERALLS_SERVICE_JOB_ID=$TRAVIS_JOB_ID-backend
    cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js; 
fi
if [[ -z "${CODACY_PROJECT_TOKEN+x}" ]]; then
    :
else
    bash <(curl -Ls https://coverage.codacy.com/get.sh) report -r ./coverage/lcov.info;
fi
npm run grunt eslint -- --format=json --output-file=eslint.json
cd ..
if [[ -z "${SONAR_TOKEN+x}" ]]; then
    :
else
    sonar-scanner;
fi