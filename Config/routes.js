const OrderController = require('../Controllers/OrderController')
const DishesController = require('../Controllers/DishesController')

const routes = (app) => {

    app.get('/dishes', DishesController.getAllDishes)
    app.get('/dishes/:course', DishesController.getAllDishesOfType)
    app.post('/orders', /* story 3 controller.function */ )
    app.put('/orders/addToOrder', /* story 4 controller.function */ )
    app.put('/orders', OrderController.removeOrderItem )
    app.put('/orders/editQuantity', /* story 6 controller.function */ )
    app.put('/orders/submitOrder', /* story 7 controller.function */ )
    app.get('/orders/:id', /* story 7 controller.function */ )
}

module.exports = routes
