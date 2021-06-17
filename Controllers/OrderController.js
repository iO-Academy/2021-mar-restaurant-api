const DbService = require('../Services/DbService')
const OrderService = require('../Services/OrderService')
const JSONResponseService = require('../Services/JSONResponseService')
const PriceService = require('../Services/PriceService')
const ObjectId = require('mongodb').ObjectId
const orderValidate = require('../Validators/newOrderValidator.json')
const addToOrderValidate = require('../Validators/addItemsToOrderValidator.json')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv()
addFormats(ajv)

const createNewOrder = (req, res) => {
    DbService.connectToDb(async (db) => {
        const order = {
            name: req.body.name,
            firstLineOfAddress: req.body.firstLineOfAddress,
            postcode: req.body.postcode,
            email: req.body.email,
        }

        const newOrderValidate = ajv.compile(orderValidate)
        const valid = newOrderValidate(order)
        if (valid) {
            try {
                const newOrder = await OrderService.createNewOrder(db, order)
                if (newOrder.insertedCount === 1) {
                    let response  = JSONResponseService.generateSuccessResponse()
                    response.message = "Order created"
                    response.data = newOrder.ops
                    return res.json(response)
                }
            } catch (e) {
                let response = JSONResponseService.generateFailureResponse()
                response.message = "Database request failed"
                return res.json(response)
            }
        }
        let response = JSONResponseService.generateFailureResponse()
        response.message = "Validator failed"
        return res.json(response)
    })
}

const addToOrder = (req, res) => {
    DbService.connectToDb(async (db) => {
        const itemsToOrder = {
            orderId: req.body.orderId,
            orderItems: req.body.orderItems
        }

        const compile = ajv.compile(addToOrderValidate)
        const valid = compile(itemsToOrder)

        if (valid) {
            try {
                await OrderService.addItemsToOrder(db, itemsToOrder)
                let response = JSONResponseService.generateSuccessResponse()
                response.message = "Dish successfully added to order"
                return res.json(response)
            } catch (e) {
                let response = JSONResponseService.generateFailureResponse()
                response.message = "Dish not found so cannot add to order"
                return res.json(response)
            }
        }
        let response = JSONResponseService.generateFailureResponse()
        response.message = "Invalid data types provided"
        return res.json(response)
    })
}

let getDishPriceById = (req, res) => {
    DbService.connectToDb(async (db) => {
        const dishId = ObjectId(req.params.id)
        const dish = await OrderService.getDishPriceById(db, dishId)
        return dish.price
    })
}

let submitFinalOrder = (req, res) => {
    DbService.connectToDb(async (db) => {
        const order = {
            orderId: ObjectId(req.body.orderId)
        }
        try {
            const finalisedOrder = await OrderService.getOrderDetails(db, order.orderId)
            const totalPrice = await PriceService.calculateTotalPrice(db, finalisedOrder)
            const submittedOrder = await OrderService.submitFinalOrder(db, order, totalPrice)
            if (submittedOrder.modifiedCount === 1) {

                let response = JSONResponseService.generateSuccessResponse()
                response.data = await OrderService.getOrderDetails(db, order.orderId)
                response.message = "The order has been placed"
                return res.json(response)
            }
            let response = JSONResponseService.generateFailureResponse()
            response.message = "Order has already been submitted"
            return res.json(response)
        } catch (e) {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "Database request failed"
            return res.json(response)
        }
    })
}

let getOrderDetails = (req, res) => {
    DbService.connectToDb(async (db) => {
        const order = {
            orderId: ObjectId(req.params.id)
        }
        try {
            const orderDetails = await OrderService.getOrderDetails(db, order.orderId)
            return res.json(orderDetails)
        } catch (e) {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "Database request failed"
            return res.json(response)
        }

    })
}

let removeOrderItem = (req, res) => {
    DbService.connectToDb(async (db) => {
        const item = {
            orderId: ObjectId(req.body.orderId),
            menuItemId: req.body.menuItemId,
        }
        const removeOrder = await OrderService.removeOrderItem(db, item)
        if(removeOrder.modifiedCount === 1) {
            let response  = JSONResponseService.generateSuccessResponse()
            response.message = "All dishes of this quantity successfully deleted from order"
            return res.json(response)
        }
        let response = JSONResponseService.generateFailureResponse()
        response.message = "Item was not deleted from order"
        return res.json(response)
    } )
}


module.exports.createNewOrder = createNewOrder
module.exports.submitFinalOrder = submitFinalOrder
module.exports.addToOrder = addToOrder
module.exports.getDishPriceById = getDishPriceById
module.exports.getOrderDetails = getOrderDetails
module.exports.removeOrderItem = removeOrderItem

