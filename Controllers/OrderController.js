const DbService = require('../Services/DbService')
const DishesService = require('../Services/DishesService')
const ObjectId = require('mongodb').ObjectId
const OrderService = require('../Services/OrderService')


let createNewOrder = (req, res) => {
    DbService.connectToDb(async (db) => {
        const order = {
            name: req.body.name,
            deliveryAddress: req.body.deliveryAddress,
            email: req.body.email,
            orderItems: req.body.orderItems
        }
        try {
            const newOrder = await OrderService.createNewOrder(db, order)
            if (newOrder.insertedCount === 1) {
                return res.json({
                    "success": true,
                    "message": "Order created",
                    "status": 200,
                    "data": newOrder
                })
            }
        } catch (e) {
            return res.json({
                "success": false,
                "message": "Database request failed",
                "status": 404
            })
        }
    })
}

let removeOrderItem = (req, res) => {
    DbService.connectToDb(async (db) => {
        const item = {
            orderId: ObjectId(req.body.orderId),
            menuItemId: req.body.menuItemId
        }
        const removeOrder = await OrderService.removeOrderItem(db, item)
    })
    res.send("yes")
}


module.exports.removeOrderItem = removeOrderItem

