const http = require('http')
const parseUrl = require('url').parse
const path = require('path')
const fs = require('fs')

const handler = (req, res) => {
  const url = parseUrl(req.url)
    .pathname.split('/')
    .filter(Boolean)
    .join('/')

  let file = null

  if (url === 'index.js') file = 'index.js'
  else file = 'index.html'

  fs.createReadStream(path.resolve(__dirname, file)).pipe(res)
}

const server = http.createServer(handler)

const port = process.env.PORT || 8083

server.listen(port)

console.log(`server ready on http://localhost:${port}`)
