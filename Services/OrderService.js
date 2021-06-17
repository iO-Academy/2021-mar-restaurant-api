const ObjectId = require('mongodb').ObjectId
const DishesService = require('../Services/DishesService')

const createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne(order)
    return result
}

const getDeliveryTime = (date) => {
    const deliveryTime = Math.floor(Math.random() * (45 - 25) + 25)
    date.setMinutes(date.getMinutes() + deliveryTime)
    return date
}

const submitFinalOrder = async  (db, order, totalPrice) => {
    const collection = db.collection('orders')
    const timePlaced = new Date()
    const deliveryTime = getDeliveryTime(timePlaced)
    const result = await collection.updateOne(
        { _id: order.orderId},
        {$set: {isOrderSubmitted: true, timePlaced: timePlaced, totalPrice: totalPrice, deliveryTime: deliveryTime}})
    return result
}


const getOrderDetails = async (db, orderId) => {
    const collection = db.collection('orders')
    const result = await collection.findOne({_id: orderId})
    return result
}

const getOrder = async (db, orderId) => {
    const collection = db.collection('orders')
    const order = await collection.findOne({ _id : ObjectId(orderId)})
    return order
}

const updateOrderItems = async (db, orderId, newOrderItems) => {
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

    const updateSuccess = updateOrderItems(db, itemsToOrder.orderId, order.orderItems)
    return updateSuccess.modifiedCount
}

const editOrderItemQuantity = async (db, request) => {
    const order = await getOrder(db, request.orderId)
    const index = order.orderItems.findIndex(orderItem => orderItem.menuItemId === request.menuItemId)
    if (index !== (-1)) {
        order.orderItems[index].quantity = request.quantity
    }
    const updateSuccess = updateOrderItems(db, request.orderId, order.orderItems)
    return updateSuccess
}

const removeOrderItem = async (db, item) => {
    const collection = db.collection('orders')
    const result = await collection.updateOne(
        {_id: item.orderId},
        {$pull: {orderItems: { menuItemId: item.menuItemId }}})
    return result
}

const cancelOrder = async (db, orderId) => {
    const collection = db.collection('orders')
    const result = await collection.updateOne(
        {_id: orderId},
        {$set: {isOrderCancelled: false}}
    )
    return result
}


module.exports.createNewOrder = createNewOrder
module.exports.getOrderDetails = getOrderDetails
module.exports.removeOrderItem = removeOrderItem
module.exports.submitFinalOrder = submitFinalOrder
module.exports.addItemsToOrder = addItemsToOrder
module.exports.editOrderItemQuantity = editOrderItemQuantity
module.exports.cancelOrder = cancelOrder

