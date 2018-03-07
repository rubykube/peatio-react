var express = require('express')
  , logger = require('morgan')
  , session = require('express-session')

var Grant = require('grant-express')
  , grant = new Grant(require('./config.json'))

const PORT = 4200

var app = express()
app.use(logger('dev'))
// REQUIRED:
app.use(session({secret:'very secret'}))
// mount grant
app.use(grant)

app.use(express.static('../develop/dist'));

app.get('/handle_barong_callback', function (req, res) {
  console.log(req.query)
  res.redirect(`/#/callback?token=${req.query.access_token}`);
  //res.end(JSON.stringify(req.query, null, 2))
})

app.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT)
})
