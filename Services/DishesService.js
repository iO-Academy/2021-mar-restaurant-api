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

const getOneDish = async (db, dishId) => {
    const collection = db.collection('dishes')
    const query = { _id: ObjectId(dishId) }
    const update = await collection.findOne( query )
    return update
}

module.exports.getAllDishes = getAllDishes
module.exports.getAllDishesOfType = getAllDishesOfType
module.exports.getOneDish = getOneDish