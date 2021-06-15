let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne(order)
    return result
}

module.exports.createNewOrder = createNewOrder
