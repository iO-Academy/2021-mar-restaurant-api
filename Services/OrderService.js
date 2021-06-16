let createNewOrder = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.insertOne(order, {totalCost: 0})
    return result
}

let submitFinalOrder = async  (db, order) => {
    const collection = db.collection('orders')
    const timePlaced = new Date()
    const result = await collection.updateOne(
        { _id: order.orderId},
        {$set: {isOrderSubmitted: true, timePlaced: timePlaced}})
    return result
}

let getFinalOrderDetails = async (db, order) => {
    const collection = db.collection('orders')
    const result = await collection.findOne({_id: order.orderId})
    return result
}

module.exports.createNewOrder = createNewOrder
module.exports.submitFinalOrder = submitFinalOrder
module.exports.getFinalOrderDetails = getFinalOrderDetails
