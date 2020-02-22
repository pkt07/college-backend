var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const moment = require('moment-timezone');
var indexRouter = require('./routes/index');
var debug = require('debug')('portalapi:server');
var http = require('http');

const app = express();
// swagger definition


// options for the swagger docs

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
mongoose.Promise = global.Promise;
//Seeding
mongoose.connect('mongodb://localhost/adminDashboard')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
//Setting up Morgan Logger
morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format();
})


var port = normalizePort(process.env.PORT || '3001');
console.log("app running on ",port);
app.set('port', port);
var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.set('etag',false)
//update cros in next commit
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE");
  res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization");
  next();
})

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/V2', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error_code: err.statusCode,
    error: err.message
  });
});
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
module.exports = app;