const fs = require('fs')
const path = require('path')

const assetManifest = require('../dist/assetManifest.json')
const { publicPath } = require('../dist/stats.json')

const pathIndex = assetManifest['index.js']
const pathSw = 'sw.js'

const newPathSw = 'sw.js'


const replaceFileName = s =>
  s
    .replace('/index.html', publicPath + 'index.html')
    .replace('/manifest.json', publicPath + 'manifest.json')
    .replace('/index.js', publicPath + pathIndex)
    .replace('/sw.js', publicPath + newPathSw)
    .replace('__root', publicPath)

// replace filename in index.html
{
  const content = replaceFileName(
    fs.readFileSync(path.resolve(__dirname, '../src/index.html')).toString()
  )

  fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), content)
}

// replace filename in index.js
{
  const content = replaceFileName(
    fs.readFileSync(path.resolve(__dirname, '../dist/' + pathIndex)).toString()
  )

  fs.writeFileSync(path.resolve(__dirname, '../dist/' + pathIndex), content)
}

// replace filename in sw.js
{
  const content = replaceFileName(
    fs.readFileSync(path.resolve(__dirname, '../dist/' + pathSw)).toString()
  )

  fs.writeFileSync(path.resolve(__dirname, '../dist/' + newPathSw), content)
}
