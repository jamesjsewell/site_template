const PROJECT_NAME = 'site_template'

const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const renderFile = require('ejs').renderFile
const morgan = require('morgan');

// Load Configuration
const appMiddleWare = require('./server/config/middleware.js')
const appSecrets = require('./server/config/secrets.js')
const appAuthentication = require('./server/config/auth.js')
const connectToDB = require('./server/config/db-setup.js').connectToDB

// Import Routers
let indexRouter = require('./server/routes/indexRouter.js')
let router = require('./server/routes/router.js')

// Load DB User Model (for appAuthentication configuration)
let User = require('./db/userSchema.js').User


// =========
// RUN APP
// =========
const app = express()
const PORT = process.env.PORT || 3000
app.set('port', PORT)

// =========
// VIEW ENGINE
// =========
app.set('views', './dist/views');
app.engine('html', renderFile)
app.set('view engine', 'html');

// =========
// DATABASE
// =========
connectToDB(PROJECT_NAME)

// =========
// APPLICATION MIDDLEWARE 
// =========
app.use( express.static( __dirname + '/dist/assets') );
app.use( bodyParser.json() );
//app.use( bodyParser.urlencoded() );
//app.use( cookieParser() );
//app.use( session({secret: appSecrets.sessionSecret }) );
app.use(morgan('dev'));
app.use( passport.initialize() );
app.use(bodyParser.urlencoded({ extended: false }));
//appAuthentication(User)
app.use( appMiddleWare.cookifyUser )
app.use( appMiddleWare.parseQuery )

// =========
// ROUTERS
// =========

app.use( '/', indexRouter )
app.use( '/auth', router.auth )
app.use( '/user', router.user )
app.use( '/api', router.api )

app.use(appMiddleWare.errorHandler);

app.listen(PORT,function() {
  console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})
