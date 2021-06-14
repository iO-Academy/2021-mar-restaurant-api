const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://root:password@localhost:27017'
const dbName = 'restaurant'

const Client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})

let connectToDb = (cb) => {
    Client.connect((err) => {
        let db = Client.db(dbName)
        cb(db)
    })
}

module.exports = connectToDb
