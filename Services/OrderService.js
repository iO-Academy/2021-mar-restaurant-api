let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne({
        name: order.name,
        firstLineOfAddress: order.firstLineOfAddress,
        postcode: order.postcode,
        email: order.email,
    })
    return result
}

module.exports.createNewOrder = createNewOrder
