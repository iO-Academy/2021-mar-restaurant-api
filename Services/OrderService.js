const ObjectId = require('mongodb').ObjectId
const DishesService = require('../Services/DishesService')

let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne(order, {totalCost: 0})
    return result
}

let submitFinalOrder = async  (db, order) => {
    const collection = db.collection('orders')
    const timePlaced = new Date()
    const result = await collection.updateOne(
        { _id: order.orderId},
        {$set: {isOrderSubmitted: true, timePlaced: timePlaced, totalPrice: 0}})
    return result
}

let getFinalOrderDetails = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.findOne({_id: order.orderId})
    return result
}

const getOrder = async (db, orderId) => {
    const collection = db.collection('orders')
    const order = await collection.findOne({ _id : ObjectId(orderId)})
    return order
}

const updateOrder = async (db, orderId, newOrderItems) => {
    const collection = db.collection('orders')

    const query = { _id: ObjectId(orderId) }
    const update = { $set: { orderItems: newOrderItems } }
    const result = await collection.updateOne(query, update)

    return result.modifiedCount
}

const addItemsToOrder = async (db, itemsToOrder) => {
    const order = await getOrder(db, itemsToOrder.orderId)

    for (const item of itemsToOrder.orderItems) {
        await DishesService.getOneDish(db, item.menuItemId)
        let index = order.orderItems.findIndex(orderItem => orderItem.menuItemId === item.menuItemId)
        if (index !== (-1)) {
            order.orderItems[index].quantity += item.quantity
        } else {
            order.orderItems.push(item)
        }
    }

    const updateSuccess = updateOrder(db, itemsToOrder.orderId, order.orderItems)
    return updateSuccess.modifiedCount
}

let getDishPriceById = async (db, dishId) => {
    const collection = db.collection('dishes')
    const data = await collection.findOne({_id: dishId})
    return data
}

module.exports.createNewOrder = createNewOrder
module.exports.submitFinalOrder = submitFinalOrder
module.exports.getFinalOrderDetails = getFinalOrderDetails
module.exports.addItemsToOrder = addItemsToOrder
module.exports.getDishPriceById = getDishPriceById

