let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne({
        name: order.name,
        deliveryAddress: order.deliveryAddress,
        email: order.email,
    })
    return result
}

let removeOrderItem = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.updateOne(
        {_id: order.id},
        {$pull: {orderItem: {menuItemId: order.menuItemId}}})
    return result
}

module.exports.createNewOrder = createNewOrder
module.exports.removeOrderItem = removeOrderItem
