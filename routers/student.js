var app = express.Router()

var controller = require('../controllers/student')
var middleware = require('../middlewares/student')

app.get('/', middleware.isUserLoggedIn, csrfProtection, controller.signinView)

app.post('/', middleware.isUserLoggedIn, parseForm, csrfProtection, middleware.isUser, controller.isUser)

app.get('/signout', controller.signout)

app.get('/signup', middleware.isUserLoggedIn, csrfProtection, controller.signupView)

app.post('/verify', middleware.isUserLoggedIn, parseForm, csrfProtection, middleware.sendOTP, controller.sendOTP)

app.post('/verifyOTP', middleware.isUserLoggedIn, parseForm, csrfProtection, middleware.verifyOTP, controller.verifyOTP)

app.post('/changepassword', middleware.isUserLoggedIn, parseForm, csrfProtection, middleware.changePassword, controller.changePassword)

app.get('/dashboard', middleware.isUserExist, csrfProtection, controller.dashboard)

app.post('/messages', middleware.isUserExist, parseForm, csrfProtection, controller.messages)

app.post('/authorizeme', middleware.isUserExist, parseForm, csrfProtection, controller.authorize)

app.post('/message', middleware.isUserExist, parseForm, csrfProtection, controller.message)

app.post('/mykey', middleware.isUserExist, parseForm, csrfProtection, controller.mykey)

module.exports = app