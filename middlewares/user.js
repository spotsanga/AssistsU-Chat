module.exports.isUserLoggedIn = (req, res, next) => {
    if (req.session.user && req.session.role == 1) {
        res.redirect('/user/dashboard')
        return
    }
    next()
}
module.exports.isUserExist = (req, res, next) => {
    if (req.session.user && req.session.role == 1) {
        next()
        return
    }
    res.redirect('/user')
}
module.exports.isUser = (req, res, next) => {
    var email = req.body.email, password = req.body.password
    var flag = false
    if (!validator.isEmail(email)) {
        req.session.response = { code: 1, message: 'Enter valid Email' }
        flag = true
    }else if (!validator.isLength(password, { min: 1, max: 15 })) {
        req.session.response = { code: 1, message: 'Password length should be 1-15' }
        flag = true
    }
    if (flag) {
        res.redirect('/user')
        return
    }
    next()
}
module.exports.message = (re, res, next) => {
    var message = req.body.message
    if (!validator.isLength(message, { min: 1 })) {
        res.send(500)
        return
    }
    next()
}