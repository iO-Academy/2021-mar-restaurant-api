let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne(order)
    return result
}

let submitFinalOrder = async  (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.updateOne(
        { _id: order.orderId},
        {$set: {isOrderSubmitted: true}}
        )
    return result
}

module.exports.createNewOrder = createNewOrder
module.exports.submitFinalOrder = submitFinalOrder
