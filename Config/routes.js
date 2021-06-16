const OrderController = require('../Controllers/OrderController')
const DishesController = require('../Controllers/DishesController')

const routes = (app) => {
    app.get ('/dishes/:id', OrderController.getDishPriceById)
    app.get('/dishes', DishesController.getAllDishes)
    app.get('/dishes/:course', DishesController.getAllDishesOfType)
    app.post('/orders', OrderController.createNewOrder)
    app.put('/orders/addToOrder', OrderController.addToOrder)
    app.put('/orders/editQuantity', /* story 6 controller.function */ )
    app.put('/orders/submitOrder', OrderController.submitFinalOrder )
    app.get('/orders/:id', OrderController.getOrderDetails )
}

module.exports = routes
