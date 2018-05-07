const { spawn } = require('child_process')
const puppeteer = require('puppeteer')
const path = require('path')

const whenServerReady = server =>
  new Promise((resolve, reject) => {
    server.stdout.on('data', data => {
      if (data.toString().includes('ready')) resolve()
    })

    server.stderr.on('data', data => reject(data.toString()))
  })

const spawnServer = (port, env) => {
  const start = path.resolve(__dirname, `./renderer/start.js`)

  return spawn('node', [start], {
    env: Object.assign({}, process.env, env || {}, { PORT: port.toString() }),
  })
}

const render = async key => {
  // console.log('spawning')
  const server = spawnServer(8888)

  await whenServerReady(server)

  // console.log('screenshoting')

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setViewport({
    width: 800,
    height: 600,
  })

  await page.goto('http://localhost:8888/' + key, { waitUntil: 'networkidle2' })
  const buffer = await page.screenshot({ type: 'jpeg', fullpage: true })

  // console.log('done')

  server.kill()

  await browser.close()

  return buffer
}

module.exports = render
