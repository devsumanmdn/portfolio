const next = require('next')
const http2 = require('http2')
const fs = require('fs')

const http2Config = require('./config/http2.config');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

// Init the Next app:
const app = next({ dev })

// Create the secure HTTPS server:
// Don't forget to create the keys for your development
const server = http2.createSecureServer(http2Config())

app.prepare().then(() => {
  server.on('error', err => console.error(err))

  // Process the various routes based on `req`
  // `/`      -> Render index.js
  // `/about` -> Render about.js
  server.on('request', (req, res) => {
    switch (req.url) {
      case '/about':
        return app.render(req, res, '/about', req.query)
      default:
        return app.render(req, res, '/', req.query)
    }
  })

  server.listen(port)

  console.log(`Listening on HTTPS port ${port}`)
})
