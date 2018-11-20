var crypto = require('../conf/crypto')
module.exports.signinView = (req, res) => {
    var data = {}
    if (req.session.response) {
        data = req.session.response
        req.session.response = null
    }
    res.render('user/signin', { data: data, csrfToken: req.csrfToken() })
}
module.exports.isUser = (req, res) => {
    var find = {
        email: req.body.email,
        password: req.body.password
    }
    var users = require('../model').users
    users.findOne(find, (err, result) => {
        if (!result) {
            req.session.response = {
                code: 1,
                message: 'Incorrect Username or Password'
            }
            res.redirect('/user')
            return
        }
        req.session.user = result
        req.session.role = 1
        res.redirect('/user/dashboard')
    })
}
module.exports.dashboard = (req, res) => {
    var find = { email: req.session.user.email }
    var users = require('../model').users
    users.findOne(find, (err, result) => {
        var messages = require('../model').messages
        messages.find({}).toArray((err, _messages) => {
            var data = {
                name: result.name,
                email: result.email,
                messages: _messages,
                G: crypto.G,
                P: crypto.P,
                y: crypto.y,
                min: crypto.min,
                max: crypto.max,
            }
            res.render('user/dashboard', { data: data, csrfToken: req.csrfToken() })
        })
    })
}
module.exports.mykey = (req, res) => {
    var x = parseInt(req.body.x), b = crypto.b, P = crypto.P, key = crypto.compute(x, b, P).toString()
    var find = { email: req.session.user.email }, update = { $set: { key: key } }
    var users = require('../model').users
    users.findOneAndUpdate(find, update, { upsert: false }, (err, result) => { })
    req.session.user.key = key
    res.sendStatus(200)
    // console.log({ user: req.session.user, x: x, key: key })
}
module.exports.messages = (req, res) => {
    var messages = require('../model').messages
    messages.find({}).toArray((err, _messages) => {
        var data = { messages: [] }, key = req.session.user.key
        if (_messages) _messages.forEach(message => {
            message.message = crypto.encrypt(message.message, key)
            data.messages.push(message)
        })
            res.send({ data: data })
        })
}
module.exports.authorize = (req, res) => {
    var find = { email: req.session.user.email },
    update = {
        $set: { socketID: req.body.socketID, status: 1 }
    }
    var users = require('../model').users
    users.findOneAndUpdate(find, update, { upsert: false }, (err, result) => { })
    res.sendStatus(200)
}
module.exports.message = (req, res) => {
    var newMessage = {
        name: req.session.user.name,
        email: req.session.user.email,
        message: req.body.message,
        time: new Date()
    }
    res.send(newMessage)
    newMessage.message = xss(crypto.decrypt(req.body.message, req.session.user.key))
    var messages = require('../model').messages
    messages.insertOne(newMessage)
    var find = { status: 1, email: { $ne: req.session.user.email } }
    var users = require('../model').users
    users.find(find).toArray((err, result) => {
        if (result)
            result.forEach((user) => {
                tMessage = newMessage
                tMessage.message = crypto.encrypt(tMessage.message, user.key)
                io.to(user.socketID).emit('messages', tMessage);
            })
    })
}
module.exports.signout = (req, res) => {
    req.session.user = req.session.role = undefined
    res.redirect('/user')
}
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        var find = { socketID: socket.id },
        update = {
            $set: { status: 0, last_seen: new Date() },
            $unset: { socketID: 1 }
        }
        var users = require('../model').users
        users.findOneAndUpdate(find, update, { upsert: false }, (err, result) => { })
    })
})