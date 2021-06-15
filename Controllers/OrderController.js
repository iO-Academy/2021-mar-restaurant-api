const DbService = require('../Services/DbService')
const OrderService = require('../Services/OrderService')
const validate = require('../Validators/newOrderValidator.json')
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

        const newOrderValidate = ajv.compile(validate)
        const valid = newOrderValidate(order)
        if (valid) {
            try {
                const newOrder = await OrderService.createNewOrder(db, order)
                if (newOrder.insertedCount === 1) {
                    return res.json({
                        "success": true,
                        "message": "Order created",
                        "status": 200,
                        "data": newOrder.ops
                    })
                }
            } catch (e) {
                return res.json({
                    "success": false,
                    "message": "Database request failed",
                    "status": 404
                })
            }
        } return res.json({
            "success": false,
            "message": "Validator failed",
            "status": 404
        })
    })
}

module.exports.createNewOrder = createNewOrder