const DbService = require('../Services/DbService')
const OrderService = require('../Services/OrderService')
const DishesService = require('../Services/DishesService')
const JSONResponseService = require('../Services/JSONResponseService')
const PriceService = require('../Services/PriceService')
const ObjectId = require('mongodb').ObjectId

const orderValidate = require('../Validators/newOrderValidator.json')
const addToOrderValidate = require('../Validators/addItemsToOrderValidator.json')
const idRemoveValidator = require('../Validators/removeOrderItem.json')
const submitOrderValidate = require('../Validators/submitFinalOrder.json')
const editOrderItemQuantityValidate = require('../Validators/editOrderItemQuantityValidator.json')

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
            totalCost: 0,
            isOrderSubmitted: false,
            orderItems: []
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
                response.message = "Order or menu item not found so cannot add to order"
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
        const dish = await DishesService.getDishPriceById(db, dishId)
        return res.json(dish)
    })
}

let submitFinalOrder = (req, res) => {
    DbService.connectToDb(async (db) => {
        const order = {
            orderId: ObjectId(req.body.orderId)
        }

        const compile = ajv.compile(submitOrderValidate)
        const valid = compile(order)

        if (valid) {
            try {
                const finalisedOrder = await OrderService.getOrderDetails(db, order.orderId)
                const totalPrice = await PriceService.calculateTotalPrice(db, finalisedOrder)
                let isSubmitted = finalisedOrder.isOrderSubmitted
                if (isSubmitted !== true) {
                    await OrderService.submitFinalOrder(db, order, totalPrice)
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
            }
        }
    })
}


const editOrderItemQuantity = (req, res) => {
    DbService.connectToDb(async (db) => {
        const itemsToAmend = {
            orderId: req.body.orderId,
            menuItemId: req.body.menuItemId,
            quantity: req.body.quantity
        }
        const order = await OrderService.getOrder(db, itemsToAmend.orderId)

        if (
            itemsToAmend.quantity <= 0 ||
            !Number.isInteger(itemsToAmend.quantity)
        ) {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "The quantity requested is invalid - it must be a positive integer."
            return res.json(response)
        }

        let index = order.orderItems.findIndex(orderItem => orderItem.menuItemId === itemsToAmend.menuItemId)

        if (index === (-1)) {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "The selected item is not present in this order. Please try again."
            return res.json(response)
        }

        const compile = ajv.compile(editOrderItemQuantityValidate)
        const valid = compile(itemsToAmend)

        if (valid) {
            try {
                const editSuccess = await OrderService.editOrderItemQuantity(db, itemsToAmend)
                if (editSuccess) {
                    let response = JSONResponseService.generateSuccessResponse()
                    response.message = "Quantity updated successfully"
                    return res.json(response)
                }
                let response = JSONResponseService.generateFailureResponse()
                response.message = "Quantity not updated - quantity of selected item is already " + itemsToAmend.quantity
                return res.json(response)
            } catch (e) {
                let response = JSONResponseService.generateFailureResponse()
                response.message = "Something went wrong with the database - please try again later"
                return res.json(response)
            }
        }
        let response = JSONResponseService.generateFailureResponse()
        response.message = "Invalid data types provided"
        return res.json(response)
    })
}


let getOrderDetails = (req, res) => {
    DbService.connectToDb(async (db) => {
        const order = {
            orderId: ObjectId(req.params.id)
        }
        const compile = ajv.compile(submitOrderValidate)
        const valid = compile(order)
        if (valid) {
            try {
                const orderDetails = await OrderService.getOrderDetails(db, order.orderId)
                return res.json(orderDetails)
            } catch (e) {
                let response = JSONResponseService.generateFailureResponse()
                response.message = "Order number not valid"
                return res.json(response)
            }
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
        const idValidator = ajv.compile(idRemoveValidator)
        const valid = idValidator(item)
        if (valid) {
            try {
                const removedOrder = await OrderService.removeOrderItem(db, item)
                if (removedOrder.modifiedCount === 1) {
                    let response  = JSONResponseService.generateSuccessResponse()
                    response.message = "Item removed"
                    response.data = removedOrder.ops
                    return res.json(response)
                }
                let response = JSONResponseService.generateFailureResponse()
                response.message = "This item has already been removed"
                return res.json(response)
            } catch (e) {
                let response = JSONResponseService.generateFailureResponse()
                response.message = "An error has occurred"
                return res.json(response)
            }
        }

        let response = JSONResponseService.generateFailureResponse()
        response.message = "Validator failed"
        return res.json(response)
    })
}


module.exports.editOrderItemQuantity = editOrderItemQuantity
module.exports.createNewOrder = createNewOrder
module.exports.getOrderDetails = getOrderDetails
module.exports.removeOrderItem = removeOrderItem
module.exports.submitFinalOrder = submitFinalOrder
module.exports.addToOrder = addToOrder
module.exports.getDishPriceById = getDishPriceById
