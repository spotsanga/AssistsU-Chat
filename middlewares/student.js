module.exports.isUserLoggedIn = (req, res, next) => {
    if (req.session.user && req.session.role == 1) {
        res.redirect('/student/dashboard')
        return
    }
    next()
}
module.exports.isUserExist = (req, res, next) => {
    if (req.session.user && req.session.role == 1) {
        next()
        return
    }
    res.redirect('/student')
}
module.exports.isUser = (req, res, next) => {
    var roll_no = req.body.roll_no, password = req.body.password
    var flag = false
    if (!validator.isNumeric(roll_no, { no_symbols: true })) {
        req.session.response = { code: 1, message: 'Roll number should be Numeric' }
        flag = true
    } else if (!validator.isLength(roll_no, { min: 10, max: 10 })) {
        req.session.response = { code: 1, message: 'Roll number length should be 10' }
        flag = true
    } else if (!validator.isLength(password, { min: 8, max: 15 })) {
        req.session.response = { code: 1, message: 'Password length should be 8-15' }
        flag = true
    }
    if (flag) {
        res.redirect('/student')
        return
    }
    next()
}
module.exports.sendOTP = (req, res, next) => {
    var roll_no = req.body.roll_no
    var flag = false
    if (!validator.isNumeric(roll_no, { no_symbols: true })) {
        req.session.response = { code: 1, message: 'Roll number should be Numeric' }
        flag = true
    } else if (!validator.isLength(roll_no, { min: 10, max: 10 })) {
        req.session.response = { code: 1, message: 'Roll number length should be 10' }
        flag = true
    }
    if (flag) {
        res.redirect('/student/signup')
        return
    }
    next()
}
module.exports.verifyOTP = (req, res, next) => {
    var otp = req.body.otp
    if (!validator.isNumeric(otp, { no_symbols: true }) || !validator.isLength(otp, { min: 4, max: 4 })) {
        var data = { code: 1, message: 'Invalid OTP' }
        res.render('student/verifyotp', { data: data })
        return
    }
    next()
}
module.exports.changePassword = (req, res, next) => {
    var password = req.body.password
    if (!validator.isLength(password, { min: 8, max: 15 })) {
        var data = { code: 1, message: 'Password length should be 8-15' }
        res.render('student/changepassword', { data: data })
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