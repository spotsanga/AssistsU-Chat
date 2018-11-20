var mongodb = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
console.log('Database requested')
mongodb.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) throw err
    var db = client.db('assistsu-chat')
    db.createCollection('users')
    db.createCollection('messages')
    db.createCollection('users_otp')
    module.exports = {
        users: db.collection('users'),
        faculties: db.collection('faculties'),
        messages: db.collection('messages'),
    }
    console.log('Database Ready')
})