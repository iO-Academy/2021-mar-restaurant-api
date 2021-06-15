const DbService = require('../Services/DbService')
const DishesService = require('../Services/DishesService')
const JSONResponseService = require('../Services/JSONResponseService')

let getAllDishes = (req, res) => {
    DbService.connectToDb(async (db) => {
        let dishes = await DishesService.getAllDishes(db, req)
        let response = JSONResponseService.generateSuccessResponse()
        response.message = "Requested starters retrieved successfully."
        response.data = dishes
        res.json(response)
    })
}

let getAllDishesOfType = (req, res) => {
    DbService.connectToDb(async (db) => {
        let dishes = await DishesService.getAllDishesOfType(db, req)
        let response = JSONResponseService.generateSuccessResponse()
        response.message = "Requested "  + req.params.course + " retrieved successfully."
        response.data = dishes
        res.json(response)
    })
}

module.exports.getAllDishes = getAllDishes
module.exports.getAllDishesOfType = getAllDishesOfType