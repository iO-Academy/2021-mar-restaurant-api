const DbService = require('../Services/DbService')
const OrderService = require('../Services/OrderService')
const JSONResponseService = require('../Services/JSONResponseService')
const ObjectId = require('mongodb').ObjectId
const orderValidate = require('../Validators/newOrderValidator.json')
const addToOrderValidate = require('../Validators/addItemsToOrderValidator.json')
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
                response.message = "Dish not found so cannot add to order"
                return res.json(response)
            }
        }
        let response = JSONResponseService.generateFailureResponse()
        response.message = "Invalid data types provided"
        return res.json(response)
    })
}

const editOrderItemQuantity = (req, res) => {
    DbService.connectToDb(async (db) => {
        const itemsToAmend = {
            orderId: req.body.orderId,
            menuItemId: req.body.menuItemId,
            quantity: req.body.quantity
        }

        const compile = ajv.compile(editOrderItemQuantityValidate)
        const valid = compile(itemsToAmend)

        if (valid) {
            try {
                const editSuccess = await OrderService.editOrderItemQuantity(db, itemsToAmend)
                console.log(editSuccess)
                if (editSuccess) {
                    let response = JSONResponseService.generateSuccessResponse()
                    response.message = "Quantity updated successfully"
                    return res.json(response)
                }
                let response = JSONResponseService.generateFailureResponse()
                response.message = "Dish not found - please check menuItemId"
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

module.exports.createNewOrder = createNewOrder
module.exports.addToOrder = addToOrder
module.exports.editOrderItemQuantity = editOrderItemQuantity

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
module.exports.addToOrder = addToOrder
module.exports.removeOrderItem = removeOrderItem
