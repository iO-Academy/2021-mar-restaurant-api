let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne(order)
    return result
}

let removeOrderItem = async (db, item) => {
    const collection = db.collection('orders')
    const result = await collection.updateOne(
        {_id: item.orderId},
        {$pull: {orderItems: { menuItemId: item.menuItemId }}})
    return result
}

module.exports.createNewOrder = createNewOrder
module.exports.removeOrderItem = removeOrderItem
