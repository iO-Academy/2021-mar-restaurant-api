const DbService = require('../Services/DbService')
const DishesService = require('../Services/DishesService')
const JSONResponseService = require('../Services/JSONResponseService')

let getAllStarters = (req, res) => {
    DbService.connectToDb(async (db) => {
        let starters = await DishesService.getAllStarters(db, req)
        let response = JSONResponseService.generateSuccessResponse()
        response.message = "requested dishes successfully retrieved."
        response.data = starters
        res.json(response)
    })
}

module.exports.getAllStarters = getAllStarters