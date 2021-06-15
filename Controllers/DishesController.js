const DbService = require('../Services/DbService')
const DishesService = require('../Services/DishesService')

let getAllStarters = (req, res) => {
    DbService.connectToDb(async (db) => {
        let starters = await DishesService.getAllStarters(db, req)
        let response = { 'property' : true, 'fruit' : starters }
        res.json(response)
    })
}

module.exports.getAllStarters = getAllStarters