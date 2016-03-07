var express = require('express');
var app = express();


/************************************************************
 *
 * Express routes for:
 *   - app.js
 *   - style.css
 *   - index.html
 *
 *   Sample endpoints to demo async data fetching:
 *     - POST /landing
 *     - POST /home
 *
 ************************************************************/

// Serve application file depending on environment
app.get('/dist/app.js', function (req, res) {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/dist/app.js');
  } else {
    res.redirect('//localhost:9090/dist/app.js');
  }
});

// Serve aggregate stylesheet depending on environment
app.get('/dist/style.css', function (req, res) {
  if (process.env.PRODUCTION) {
    res.sendFile(__dirname + '/dist/style.css');
  } else {
    res.redirect('//localhost:9090/dist/style.css');
  }
});

app.use(express.static(__dirname + '/dist'));

// Serve index page
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


/*************************************************************
 *
 * Webpack Dev Server
 *
 * See: http://webpack.github.io/docs/webpack-dev-server.html
 *
 *************************************************************/

if (!process.env.PRODUCTION) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var config = require('./webpack.local.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(9090, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }
  });
}


/******************
 *
 * Express server
 *
 *****************/

var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Essential React listening at http://%s:%s', host, port);
});
