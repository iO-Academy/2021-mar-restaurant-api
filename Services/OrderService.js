let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne(order)
    return result
}

let submitFinalOrder = async  (db, order) => {
    const collection = db.collection('orders')
    const timePlaced = new Date()
    const result = await collection.updateOne(
        { _id: order.orderId},
        {$set: {isOrderSubmitted: true, timePlaced: timePlaced}}
        )
    return result
}

module.exports.createNewOrder = createNewOrder
module.exports.submitFinalOrder = submitFinalOrder
