import express from 'express'
import ReactEngine from 'react-engine'

let reactEngineWrapper = (routesFilePath, toClient = {}) => {
  let routes = require(routesFilePath)
  let app = express()

  // create the view engine with `react-engine`
  let engine = ReactEngine.server.create({
    routes: routes,
    routesFilePath: routesFilePath,
    performanceCollector: function (stats) {
      // console.log(stats)
    }
  })

  // set the engine
  app.engine('.jsx', engine)

  // set jsx as the view engine
  app.set('view engine', 'jsx')

  // finally, set the custom view
  app.set('view', ReactEngine.expressView)

  // add our app routes
  app.use(function (req, res) {
    let props = (typeof toClient === 'function') ? toClient(req) : toClient
    return res.render(req.url, props)
  })

  app.use(function (err, req, res, next) {
    if (err) throw err

    // http://expressjs.com/en/guide/error-handling.html
    if (res.headersSent) {
      return next(err)
    }

    if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_REDIRECT) {
      return res.redirect(302, err.redirectLocation)
    } else if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_NOT_FOUND) {
      return res.status(404).send('Route Not Found!')
    } else {
      // for ReactEngine.reactRouterServerErrors.MATCH_INTERNAL_ERROR or
      // any other error we just send the error message back
      return res.status(500).send(err.message)
    }
  })

  return app
}

export default reactEngineWrapper
