const ObjectId = require('mongodb').ObjectId

let getAllDishes = async (db, req) => {
    const collection = db.collection('dishes')
    const data = await collection.find({}).toArray()
    return data
}

let getAllDishesOfType = async (db, req) => {
    const collection = db.collection('dishes')
    const data = await collection.find({dishType: req.params.course}).toArray()
    return data
}

module.exports.getAllDishes = getAllDishes
module.exports.getAllDishesOfType = getAllDishesOfType