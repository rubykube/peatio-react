var express = require('express')
  , logger = require('morgan')
  , session = require('express-session')

var Grant = require('grant-express')
  , grant = new Grant(require('./config.json'))

var app = express()
app.use(logger('dev'))
// REQUIRED:
app.use(session({secret:'very secret'}))
// mount grant
app.use(grant)

app.use(express.static('../dist'));

app.get('/handle_barong_callback', function (req, res) {
  
  
  console.log(req.query)
  res.redirect(`/#/callback?token=${req.query.access_token}`);
  //res.end(JSON.stringify(req.query, null, 2))

})

app.listen(4200, function() {
  console.log('Express server listening on port ' + 4200)
})
