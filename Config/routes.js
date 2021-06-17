const OrdersController = require('../Controllers/OrderController')
const OrderController = require('../Controllers/OrderController')
const DishesController = require('../Controllers/DishesController')

const routes = (app) => {

    app.get('/dishes', DishesController.getAllDishes)
    app.get('/dishes/:course', DishesController.getAllDishesOfType)
    app.post('/orders', OrdersController.createNewOrder)
    app.put('/orders/addToOrder', OrderController.addToOrder)
    app.delete('/orders', /* story 5 controller.function */ )
    app.put('/orders/editQuantity', OrdersController.editOrderItemQuantity)
    app.put('/orders/submitOrder', /* story 7 controller.function */ )
    app.get('/orders/:id', /* story 7 controller.function */ )
}

module.exports = routes
