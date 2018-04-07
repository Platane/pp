#!/usr/bin/env bash
set -e

node __tests__/index.js | ./packages/api/node_modules/.bin/tap-spec
