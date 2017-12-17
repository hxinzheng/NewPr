import React from 'react'
import ReactDOM from 'react-dom/server'
import createHistory from 'history/createMemoryHistory'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from 'app/container/app'

export default ({ clientStats }) => (req, res) => {
  const history = createHistory({ initialEntries: [req.path] })
  const app = ReactDOM.renderToString(<App history={history} />)
  const chunkNames = flushChunkNames()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets
  } = flushChunks(clientStats, { chunkNames })

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${styles}
          <link rel="stylesheet" href="/public/css/weui.min.css">
        </head>
        <body>
          <div id="app">${app}</div>
          ${cssHash}
          ${js}

          <script src='/public/js/flexible.js'></script>
        </body>
      </html>`
  )
}