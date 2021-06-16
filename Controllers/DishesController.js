const DbService = require('../Services/DbService')
const DishesService = require('../Services/DishesService')
const JSONResponseService = require('../Services/JSONResponseService')
const ObjectId = require('mongodb').ObjectId


const getAllDishes = (req, res) => {
    DbService.connectToDb(async (db) => {
        try {
            const dishes = await DishesService.getAllDishes(db, req)
            let response = JSONResponseService.generateSuccessResponse()
            response.message = "Requested dishes retrieved successfully."
            response.data = dishes
            res.json(response)
        } catch (e) {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "The resources requested do not exist at the desired location."
            res.json(response)
        }
    })
}

const getAllDishesOfType = (req, res) => {
    DbService.connectToDb(async (db) => {
        if (
            req.params.course === 'starters' ||
            req.params.course === 'mains' ||
            req.params.course === 'desserts' ||
            req.params.course === 'refreshments'
        ) {
            try {
                const dishes = await DishesService.getAllDishesOfType(db, req.params.course)
                let response = JSONResponseService.generateSuccessResponse()
                response.message = "Requested " + req.params.course + " retrieved successfully."
                response.data = dishes
                res.json(response)
            } catch (e) {
                let response = JSONResponseService.generateFailureResponse()
                response.message = "The resources requested do not exist at the desired location."
                res.json(response)
            }
        } else {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "You must provide a valid category."
            res.json(response)
        }
    })
}

let getDishPriceById = (req, res) => {
    DbService.connectToDb(async (db) => {
        const dishId = ObjectId(req.params.id)
        const dish = await DishesService.getDishById(db, dishId)
        const dishPrice = dish.price
        res.json(dishPrice)
    })
}

module.exports.getAllDishes = getAllDishes
module.exports.getAllDishesOfType = getAllDishesOfType
module.exports.getDishPriceById = getDishPriceById
