const fs = require('fs')
const path = require('path')
const render = require('../lib/service/render').render

//
;[
  //
  'index.html',
  'instruction',
].map(async pathname =>
  fs.writeFileSync(
    path.resolve(__dirname, '../dist/', pathname),
    await render(pathname)
  )
)
