const fs = require('fs')
const path = require('path')
const render = require('../src')
const cpuCount = require('os').cpus().length


const encodeBase64 = x => new Buffer(x).toString('base64')

const keys = [
  //
  'home',
  ...Array.from({ length: 100 }).map((_, i) => `score/${i}`),
]
  .map(encodeBase64)
  .map(x => `${x}.jpg`)

const parallelize = n => jobs =>
  new Promise((resolve, reject) => {
    let p = 0

    const run = async () => {
      if (jobs.length <= 0 || p >= n) return

      p++
      const next = jobs.shift()

      run()

      await next()

      p--

      if (jobs.length === 0 && p === 0) return resolve()

      run()
    }

    run()
  })

const jobs = keys.map((key, i, arr) => () =>
  console.log(`${i + 1}/${arr.length}`, key) ||
  render(key).then(buffer =>
    fs.writeFileSync(path.resolve(__dirname, '../dist', key), buffer)
  )
)

// parallelize does not work well on CI machine
parallelize(1)(jobs)
