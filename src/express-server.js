import { join } from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import reactEngineWrapper from './react-engnine-wrapper'

let app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.set('views', join(__dirname, '../views'))
app.use(express.static(join(__dirname, '../public')))

app.get('/*', reactEngineWrapper(join(__dirname, './react-routes.js'), {}))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  return next(err)
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send(err.message)
  throw err
})

export default app
