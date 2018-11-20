require('./model')
express = require('express')
var app = express()

var http = require('http').Server(app)

io = require('socket.io')(http)
var cookieParser = require('cookie-parser')
var csrf = require('csurf')
csrfProtection = csrf({ cookie: true })
var bodyParser = require('body-parser')
parseForm = bodyParser.urlencoded({ extended: false })

validator = require('validator')
xss = require('xss')

var session = require('express-session')
app.use(session({
    secret: "Its secret", resave: false,
    saveUninitialized: true,
}))
app.use(cookieParser())

require('ejs').delimiter = '?'
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('./public'))
app.use(express.static('./node_modules/socket.io-client/dist'))
app.use(express.static('./node_modules/jquery/dist'))
app.use(express.static('./node_modules/bootstrap/dist'))
app.use(express.static('./node_modules/crypto-js'))

// sendmail = require('./nodemailer').sendmail
app.get('/',(req,res)=>{
	res.redirect('/user')
})
app.use('/user', require('./routers/user'))

app.all('*', (req, res) => {
    res.render('pagenotfound')
})

port = 80, host = '0.0.0.0'
http.listen(port, host, function (err) {
    console.log(`App runs on http://${host}:${port}`)
})
