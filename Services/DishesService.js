const ObjectId = require('mongodb').ObjectId

let getAllStarters = async (db, req) => {
    const collection = db.collection('starters')
    const data = await collection.find({}).toArray()
    return data
}

let getAllMains = async (db, req) => {
    const collection = db.collection('mains')
    const data = await collection.find({}).toArray()
    return data
}

let getAllDesserts = async (db, req) => {
    const collection = db.collection('desserts')
    const data = await collection.find({}).toArray()
    return data
}

let getAllRefreshments = async (db, req) => {
    const collection = db.collection('refreshments')
    const data = await collection.find({}).toArray()
    return data
}

module.exports.getAllStarters = getAllStarters()
