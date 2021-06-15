const DbService = require('../Services/DbService')
const DishesService = require('../Services/DishesService')
const ObjectId = require('mongodb').ObjectId
const OrderService = require('../Services/OrderService')
const JSONResponseService = require('../Services/JSONResponseService')

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
        try {
            const removeOrder = await OrderService.removeOrderItem(db, item)
            if (removeOrder.matchedCount === 1) {
                console.log(removeOrder)
                let response = JSONResponseService.generateSuccessResponse()
                response.message = "Dish successfully deleted from order"
                return res.json(response)
            }
        } catch (e) {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "Item not found so cannot be deleted from order."
            return res.json(response)
        }
    })
}


module.exports.removeOrderItem = removeOrderItem

