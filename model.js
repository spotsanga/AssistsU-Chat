var mongodb = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
console.log('Database requested')
mongodb.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) throw err
    var db = client.db('temp-chat')
    db.createCollection('students')
    db.createCollection('messages')
    db.createCollection('users_otp')
    module.exports = {
        students: db.collection('students'),
        faculties: db.collection('faculties'),
        messages: db.collection('messages'),
        users_otp: db.collection('users_otp'),
    }
    console.log('Database Ready')
})