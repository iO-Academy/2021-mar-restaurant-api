const DbService = require('../Services/DbService')
const OrderService = require('../Services/OrderService')
const JSONResponseService = require('../Services/JSONResponseService')

const orderValidate = require('../Validators/newOrderValidator.json')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv()
addFormats(ajv)

let createNewOrder = (req, res) => {
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

module.exports.createNewOrder = createNewOrder