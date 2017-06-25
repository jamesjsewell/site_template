const PROJECT_NAME = "site_template"
const bodyParser = require("body-parser")
const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const passport = require("passport")
const renderFile = require("ejs").renderFile
const morgan = require("morgan")
const fallback = require("express-history-api-fallback")

const appMiddleWare = require("./server/config/middleware.js")
const appSecrets = require("./server/config/secrets.js")
//const appAuthentication = require('./server/config/auth.js')
const connectToDB = require("./server/config/db-setup.js").connectToDB

// Import Routers
let indexRouter = require("./server/routes/indexRouter.js")
let router = require("./server/routes/router.js")

// Load DB User Model (for appAuthentication configuration)
//let User = require('./db/userSchema.js').User

// =========
// RUN APP
// =========
const app = express()
const PORT = process.env.PORT || 3000
app.set("port", PORT)

// =========
// VIEW ENGINE
// =========
app.set("views", "./dist/views")
app.engine("html", renderFile)
app.set("view engine", "html")

// =========
// DATABASE
// =========
connectToDB(PROJECT_NAME)

// =========
// APPLICATION MIDDLEWARE
// =========
app.use(express.static(__dirname + "/dist/assets"))
app.use(bodyParser.json())
//app.use( bodyParser.urlencoded() );
//app.use( cookieParser() );
//app.use( session({secret: appSecrets.sessionSecret }) );
app.use(morgan("dev"))
app.use(passport.initialize())
app.use(bodyParser.urlencoded({ extended: false }))
//appAuthentication(User)
//app.use( appMiddleWare.cookifyUser )
app.use(appMiddleWare.parseQuery)

// =========
// ROUTERS
// =========

app.use("/api", router)

app.use(appMiddleWare.errorHandler)

app.listen(PORT, function() {
	console.log(
		"\n\n===== listening for requests on port " + PORT + " =====\n\n"
	)
})

// app.all("*", function(req, res, next) {
// 	if (req.path.includes("/api") === false) {
// 		res.sendFile('index.html', { root: __dirname + "dist/assets/views/index.html" });
// 		app.use("/js", express.static(__dirname + "dist/assets/js/app.js"))
// 		app.use("/css", express.static(__dirname + "dist/assets/css/style.css"))
// 		app.use("/images", express.static(__dirname + "dist/assets/images"))
// 	}

// 	return next()
// })


app.get("*", function(req, res, next) {
	if (!req.url.includes("api")) {
		app.use(fallback(__dirname + "/dist/views/index.html"))
	}
	return next()
})

// Enable CORS from client-side
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });
