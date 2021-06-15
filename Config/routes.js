const OrdersController = require('../Controllers/OrdersController')
const DishesController = require('../Controllers/DishesController')

const routes = (app) => {
    app.get('/dishes/starters', DishesController.getAllStarters)
    app.get('/dishes/mains', /* story 2 controller.function */)
    app.get('/dishes/desserts', /* story 2 controller.function */ )
    app.get('/dishes/refreshments', /* story 2 controller.function */ )
    app.post('/orders', /* story 3 controller.function */ )
    app.put('/orders/addToOrder', /* story 4 controller.function */ )
    app.delete('/orders', /* story 5 controller.function */ )
    app.put('/orders/editQuantity', /* story 6 controller.function */ )
    app.put('/orders/submitOrder', /* story 7 controller.function */ )
    app.get('/orders/:id', /* story 7 controller.function */ )
}

module.exports = routes
