const ObjectId = require('mongodb').ObjectId
const DishesService = require('../Services/DishesService')

let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne(order)
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

let removeOrderItem = async (db, item) => {
    const collection = db.collection('orders')
    const result = await collection.updateOne(
        {_id: item.orderId},
        {$pull: {orderItems: { menuItemId: item.menuItemId }}})
    return result
}

module.exports.createNewOrder = createNewOrder
module.exports.addItemsToOrder = addItemsToOrder
module.exports.removeOrderItem = removeOrderItem