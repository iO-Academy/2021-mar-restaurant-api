const OrderController = require('../Controllers/OrderController')
const DishesController = require('../Controllers/DishesController')

const routes = (app) => {

    app.get ('/dishes/individualDishes/:id', DishesController.getOneDish)
    app.get('/dishes', DishesController.getAllDishes)
    app.get('/dishes/:course', DishesController.getAllDishesOfType)
    app.post('/orders', OrderController.createNewOrder)
    app.put('/orders/addToOrder', OrderController.addToOrder)
    app.put('/orders', OrderController.removeOrderItem)
    app.put('/orders/submitOrder', OrderController.submitFinalOrder)
    app.get('/orders/:id', OrderController.getOrderDetails)
    app.put('/orders/editQuantity', OrderController.editOrderItemQuantity)
}

module.exports = routes