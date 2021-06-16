const OrdersController = require('../Controllers/OrderController')
const OrderController = require('../Controllers/OrderController')
const DishesController = require('../Controllers/DishesController')

const routes = (app) => {

    app.get('/dishes', DishesController.getAllDishes)
    app.get ('/dishes/:id', DishesController.getDishPriceById)
    app.get('/dishes/:course', DishesController.getAllDishesOfType)
    app.post('/orders', OrdersController.createNewOrder)
<<<<<<< HEAD
    app.put('/orders/addToOrder', /* story 4 controller.function */ )
    app.put('/orders', /* story 5 controller.function */ )
=======
    app.put('/orders/addToOrder', OrderController.addToOrder)
    app.delete('/orders', /* story 5 controller.function */ )
>>>>>>> 87d8535e1573871fc5780b88e59a1864c54fc243
    app.put('/orders/editQuantity', /* story 6 controller.function */ )
    app.put('/orders/submitOrder', OrdersController.submitFinalOrder )
    app.get('/orders/:id', /* story 7 controller.function */ )
}

module.exports = routes
