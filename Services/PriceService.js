const ObjectId = require('mongodb').ObjectId
const OrderService = require('../Services/OrderService')

const calculateTotalPrice = async (db, finalisedOrder) => {
    let totalPrice = 0
    for (const orderItem of finalisedOrder.orderItems) {
        const dishId = ObjectId(orderItem.menuItemId)
        const dishPrice = await OrderService.getDishPriceById(db, dishId)
        const totalItemPrice = ((dishPrice * 100 * orderItem.quantity) / 100)
        totalPrice += totalItemPrice
    }
    return totalPrice

}

module.exports.calculateTotalPrice = calculateTotalPrice