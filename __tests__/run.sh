#!/usr/bin/env bash
set -e

cd ./packages/api
ENV=test yarn resetdb
yarn build:test

cd ../app
yarn build:test

cd ../../



node __tests__/index.js | ./packages/api/node_modules/.bin/tap-spec
