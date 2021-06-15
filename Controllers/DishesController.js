const DbService = require('../Services/DbService')
const DishesService = require('../Services/DishesService')
const JSONResponseService = require('../Services/JSONResponseService')

let getAllStarters = (req, res) => {
    DbService.connectToDb(async (db) => {
        let starters = await DishesService.getAllStarters(db, req)
        let response = JSONResponseService.generateSuccessResponse()
        response.message = "Requested starters retrieved successfully."
        response.data = starters
        res.json(response)
    })
}

let getAllMains = (req, res) => {
    DbService.connectToDb(async (db) => {
        let mains = await DishesService.getAllMains(db, req)
        let response = JSONResponseService.generateSuccessResponse()
        response.message = "Requested mains retrieved successfully."
        response.data = mains
        res.json(response)
    })
}

let getAllDesserts = (req, res) => {
    DbService.connectToDb(async (db) => {
        let desserts = await DishesService.getAllDesserts(db, req)
        let response = JSONResponseService.generateSuccessResponse()
        response.message = "Requested starters desserts successfully."
        response.data = desserts
        res.json(response)
    })
}

let getAllRefreshments = (req, res) => {
    DbService.connectToDb(async (db) => {
        let refreshments = await DishesService.getAllRefreshments(db, req)
        let response = JSONResponseService.generateSuccessResponse()
        response.message = "Requested refreshments retrieved successfully."
        response.data = refreshments
        res.json(response)
    })
}

module.exports.getAllStarters = getAllStarters
module.exports.getAllMains = getAllMains
module.exports.getAllDesserts = getAllDesserts
module.exports.getAllRefreshments = getAllRefreshments