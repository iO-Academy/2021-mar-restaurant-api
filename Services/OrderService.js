let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne({
        name: order.name,
        deliveryAddress: order.deliveryAddress,
        email: order.email,
    })
    return result
}

module.exports.createNewOrder = createNewOrder
