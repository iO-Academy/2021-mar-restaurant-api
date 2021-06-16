const ObjectId = require('mongodb').ObjectId


let getAllDishes = async (db, req) => {
    const collection = db.collection('dishes')
    const data = await collection.find({}).toArray()
    return data
}

let getAllDishesOfType = async (db, course) => {
    const collection = db.collection('dishes')
    const data = await collection.find({dishType: course}).toArray()
    return data
}

let getDishPriceById = async (db, dishId) => {
    const collection = db.collection('dishes')
    const data = await collection.findOne({_id: dishId})
    return data
}

module.exports.getAllDishes = getAllDishes
module.exports.getAllDishesOfType = getAllDishesOfType
module.exports.getDishPriceById = getDishPriceById