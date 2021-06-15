const DbService = require('../Services/DbService')
const DishesService = require('../Services/DishesService')
const JSONResponseService = require('../Services/JSONResponseService')

let getAllDishes = (req, res) => {
    DbService.connectToDb(async (db) => {
        try {
            let dishes = await DishesService.getAllDishes(db, req)
            let response = JSONResponseService.generateSuccessResponse()
            response.message = "Requested starters retrieved successfully."
            response.data = dishes
            res.json(response)
        } catch (e) {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "The resources requested do not exist at the desired location."
            res.json(response)
        }
    })
}

let getAllDishesOfType = (req, res) => {
    DbService.connectToDb(async (db) => {
        if (
            req.params.course === 'starters' ||
            req.params.course === 'mains' ||
            req.params.course === 'desserts' ||
            req.params.course === 'refreshments'
        ) {
            try {
                let dishes = await DishesService.getAllDishesOfType(db, req.params.course)
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

module.exports.getAllDishes = getAllDishes
module.exports.getAllDishesOfType = getAllDishesOfType
