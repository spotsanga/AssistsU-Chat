var app = express.Router()

var controller = require('../controllers/user')
var middleware = require('../middlewares/user')

app.get('/', middleware.isUserLoggedIn, csrfProtection, controller.signinView)

app.post('/', middleware.isUserLoggedIn, parseForm, csrfProtection, middleware.isUser, controller.isUser)

app.get('/signout', controller.signout)

app.get('/dashboard', middleware.isUserExist, csrfProtection, controller.dashboard)

app.post('/messages', middleware.isUserExist, parseForm, csrfProtection, controller.messages)

app.post('/authorizeme', middleware.isUserExist, parseForm, csrfProtection, controller.authorize)

app.post('/message', middleware.isUserExist, parseForm, csrfProtection, controller.message)

app.post('/mykey', middleware.isUserExist, parseForm, csrfProtection, controller.mykey)

module.exports = app