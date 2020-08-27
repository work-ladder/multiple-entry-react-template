const express = require('express')
const request = require('request')
const cp = require('child_process')
const app = express()

const port = 4000

app.use(express.static('./dist'), (req, res) => {
  const url = '' + req.url
  req.pipe(request(url)).pipe(res)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`)
  cp.exec(`http://localhost:${port}/`)
})
