let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne(order)
    return result
}

let removeOrderItem = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.updateOne(
        {_id: order.orderId},
        {$pull: {orderItem: {menuItemId: order.menuItemId}}})
    return result
}

module.exports.createNewOrder = createNewOrder
module.exports.removeOrderItem = removeOrderItem
