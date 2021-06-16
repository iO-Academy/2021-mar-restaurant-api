const ObjectId = require('mongodb').ObjectId

let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne({
        name: order.name,
        deliveryAddress: order.deliveryAddress,
        email: order.email,
    })
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

const addOneItemToOrder = async (db, req) => {
    const order = await getOrder(db, req.body.orderId)
    const itemsToAdd = req.body.orderItems

    itemsToAdd.forEach(item => {
        let index = order.orderItems.findIndex(orderItem => orderItem.menuItemId === item.menuItemId)
        if (index !== (-1)) {
            order.orderItems[index].quantity += item.quantity
        } else {
            order.orderItems.push(item)
        }
    })

    const updateSuccess = updateOrder(db, req.body.orderId, order.orderItems)
    return updateSuccess.modifiedCount
}

module.exports.createNewOrder = createNewOrder
module.exports.addOneItemToOrder = addOneItemToOrder