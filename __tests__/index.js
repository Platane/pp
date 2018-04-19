const { spawn } = require('child_process')
const path = require('path')

const whenServerReady = server =>
  new Promise((resolve, reject) => {
    server.stdout.on('data', data => {
      if (data.toString().includes('ready')) resolve()
    })

    server.stderr.on('data', data => reject(data.toString()))
  })

const untilNoLog = p =>
  new Promise((resolve, reject) => {
    let killTimeout

    p.stdout.on('data', data => {
      console.log(data.toString())
      clearTimeout(killTimeout)
      killTimeout = setTimeout(resolve, 3000)
    })

    p.stderr.on('data', data => reject(data.toString()))
  })

const spawnServer = (package, port, env) => {
  const cwd = path.resolve(__dirname, `../packages/${package}`)

  return spawn(
    'node',
    ['-e', `require('babel-register');require('${cwd}/src').create()`],
    {
      cwd,
      env: Object.assign({}, process.env, env || {}, { PORT: port.toString() }),
    }
  )
}

const run = async () => {
  console.log('spawning')

  const env = {
    API_ORIGIN: 'http://localhost:9988',
    ENV: 'test',
    API_ORIGIN2: 'http://localhost:9988',
  }

  const servers = [['api', 9988]].map(args => spawnServer(...args, env))

  console.log('spawned')

  await Promise.all(servers.map(whenServerReady))

  console.log('ready')

  const tests = spawn('node', [path.resolve(__dirname, './runTest')], {
    env: Object.assign({}, process.env, env),
  })

  await untilNoLog(tests)
  ;[...servers, tests].map(x => x.kill())
}

run()
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
  .then(() => process.exit(0))
