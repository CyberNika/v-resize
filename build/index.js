const path = require('path')
const fs = require('fs-extra')
const execSync = require('child_process').execSync

const resolve = dir => path.resolve(__dirname, '..', dir)

fs.emptyDirSync(resolve('dist'))
fs.copySync(resolve('src'), resolve('dist'))
execSync('./node_modules/babel-cli/bin/babel.js src/index.js -o dist/index.js')
