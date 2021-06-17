## Table of Contents

- [Collection structure](#collection-structure)
- [API Calls](#API-calls)
   - [GET](#GET)
        - [Getting items on the menu](#getting-items-on-the-menu)
        - [Retrieving a single dish](#retrieving-a-single-dish)
        - [Retrieving final order](#retrieving-final-order)
   - [POST](#POST)
        - [Creating a new order](#creating-a-new-order)
   - [PUT](#PUT)
        - [Adding items to an order](#adding-items-to-an-order)
        - [Edit quantities of dishes in orders](#edit-quantities-of-dishes-in-orders)
        - [Remove an item (in any quantity) from an order](#remove-an-item-in-any-quantity-from-an-order)
        - [Submit final order](#submit-final-order)

### Collection Structure
##### Collection structure for restaurant.dishes
| Property      | Value     | Type     |
| :------------- | :----------: | :----------: |
| _id |  Unique menu item id, auto-generated  | String |
| name   | Name of dish | String |
| description   | Description of the dish | String |
| price   | Amount of money the dish costs | Decimal128 |
| dishType | The course type of the dish (starters, mains, desserts, refreshments) | String |
##### Collection structure for restaurant.orders
| Property      | Value     | Type     |
| :------------- | :----------: | :----------: |
| _id |  Unique order id, auto-generated  | String |
| name   | Name of customer | String |
| deliveryAddress   | Address of customer where order needs to be delivered | String |
| email   | Customers email | String |
##### Fields added to restaurant.orders documents when items are added to an order
| Property      | Value     | Type     |
| :------------- | :----------: | :----------: |
| orderItems   | Holds object of each menu item id and quantity that customer has ordered | Array |
| isOrderSubmitted | Has the customer submitted final order (set to false initially) | Bool |
| totalPrice   | Price of all items in orderItems (set to 0 initially) | int |
##### Fields added to restaurant.orders documents when order is reviewed for submission
| Property      | Value     | Type     |
| :------------- | :----------: | :----------: |
| timePlaced   | Time order was submitted by customer | Date |
##### Fields updated in restaurant.orders documents order is reviewed for submission
| Property      | Value     | Type     |
| :------------- | :----------: | :----------: |
| isOrderSubmitted | Has the customer submitted final order -> updated to true | Bool |
| totalPrice   | Price of all items in orderItems -> updated to reflect total price | int |
## API Calls
### GET
### Getting items on the menu
Returns a JSON string of dishes (option for all dishes, and dishes by type). No authentication required.  
// return all dishes of all types (dishType)   
`GET /dishes`  
// return all starters  
`GET /dishes/starters`  
// return all mains  
`GET /dishes/mains`  
// return all desserts  
`GET /dishes/desserts`  
// return all refreshments  
`GET /dishes/refreshments`  
##### Sample Call
```javascript
fetch('http://localhost:3000/orders/:id')
    .then (res => res.json())
    .then ((data) => {
        //do stuff with your data
    })
```
##### Success Response
```json
{
    "success": true,
    "message": "Requested dishes retrieved successfully.",
    "status": 200,
    "data": [{dish}, {dish}, {dish}]
}
```
##### Error Response
```json
  {
    "success": false,
    "message": "The resources requested do not exist at the desired location.",
    "status": 404
  }
```
###Retrieving a single dish
`GET /dishes/:id`
##### Sample Call
```javascript
fetch('http://localhost:3000/orders/:id')
      .then (res => res.json())
      .then ((data) => {
         //do stuff with your data
      })
```
##### Success Response
```json
{
    "success": true,
    "message": "Requested dish retrieved successfully.",
    "status": 200,
    "data": {
        "_id": "60c73a660b5f5c23d4a61686",
        "name": "tarte tatin",
        "description": "apple with vanilla icecream",
        "price": {
            "$numberDecimal": "7.99"
        },
        "dishType": "desserts"
    }
}
```
##### Error Response
```json
   {
      "success": false,
      "message": "The resources requested do not exist at the desired location.",
      "status": 404
   }
```
### Retrieving final order
`GET /orders/:id`
##### Sample Call

```javascript
   fetch('http://localhost:3000/orders/:id')
      .then (res => res.json())
      .then ((data) => {
         //do stuff with your data
    })
```
##### Success Response
```json
{
   "_id": "60c73afb0b5f5c23d4a61688",
    "name": "isabelle",
    "deliveryAddress": "bs7 9se",
    "email": "isabelle@hotmail.co.uk",
    "orderItems": [],
    "isOrderSubmitted": true,
    "timePlaced": "2021-06-17T08:42:53.925Z",
    "totalPrice": 0
}
```
##### Error Response
```json
   {
      "success": false,
      "message": "The resources requested do not exist at the desired location.",
      "status": 404
   }
```
### POST:

### Creating a new order
`POST /orders`  

This endpoint allows you to create a new order.
##### Data Params
```json
  {
    "name": "Ashley Coles",
    "firstLineOfAddress": "1 Widcombe Crescent", 
    "postcode": "BA2 6AH",
    "email": "deliciousFood@food.com"
  }

```
##### Sample Call
```javascript
fetch('http://localhost:3000/orders', {
    "method": POST,
    "body": JSON.stringify(/* your data goes here */),
    "headers": 
        {
            "content-type": "application/JSON"
        }
            .then (res => res.json())
            .then ((data) => {
            //do stuff with your data
            })
})
```    
##### Success Response
```json
{
  "success": true,
  "message": "Order created",
  "status": 200,
  "data": [{
      "_id": "60c73afb0b5f5c23d4a61688",
      "name": "Ashley Coles",
      "firstLineOfAddress": "Melksham",
      "postcode": "BA2 6AH",
      "email": "deliciousFood@food.com"
    }]
}
```
##### Error Responses
If the validator fails
```json
{
  "success": false,
  "message": "Validator failed",
  "status": 404
}
```
If the request fails to connect to the database
```json
{
  "success": false,
  "message": "Database request failed",
  "status": 404
}
```
### PUT
### Adding items to an order
`PUT /orders/addToOrder`  
This endpoint allows you to add an item, in any quantity, to an existing order

##### Data Params
```json
{
    "orderId": "60c73afb0b5f5c23d4a61688",
    "orderItems": 
        [
          {
            "menuItemId": "60c73afb0b5234f3d4a61688",
            "quantity": 4
          }
        ]
}
```
##### Sample Call
```javascript
fetch('http://localhost:3000/orders/addToOrder', {
    "method": "PUT",
    "body": JSON.stringify(/* your data goes here */),
    "headers": {
            "content-type": "application/JSON"
        }
    .then(res => res.json())
    .then((data) => {
        //do stuff with your data
    })
})
```
##### Success Response
```json
{
    "success": true,
    "message": "Dish successfully added to order",
    "status": 200
}
```
##### Error Response
```json
{
    "success": false,
    "message": "Dish not found so cannot add to order",
    "status": 404
}
```
### Edit quantities of dishes in orders
`PUT /orders/editQuantity`
##### Data Params
```json
{
  "orderId": "60c73afb0b5f5c23d4a61688",
  "menuItemId": "60c739e10b5f5c23d4a61684",
  "quantity": 7
}
```
`orderId:` needs to be a string that represents a MongoDB ObjectID

`menuItemId:` needs to be a string that represents a MongoDB ObjectID

`quantity:` this is the number of items that have been selected 

(NOTE: this will replace the current quantity or any items with the same ID)

##### Sample Call

```javascript
fetch('http://localhost:3000/orders/editQuantity', {
    "method": "PUT",
    "body": JSON.stringify(/* your data goes here */),
    "headers": {  
        "content-type": "application/JSON"
    }
    .then (res => res.json())
    .then ((data) => {
      //do stuff with your data
    })
})
```

##### Success Response

```json
{
    "success": true,
    "message": "Quantity updated successfully",
    "status": 200
}
```

##### Error Response
If the DB fails to update the dish quantity:
```json
{
    "success": false,
    "message": "Dish quantity was not updated",
    "status": 400
}
```

If there is an issue connecting with the database. 
```json
{
    "success": false,
    "message": "Something went wrong with the database - please try again later",
    "status": 400
}
```
	
If the dish ID is incorrect:
```json
{
    "success": false,
    "message": "Dish not found - please check menuItemId",
    "status": 404
}
```

### Remove an item (in any quantity) from an order
`PUT /orders/removeDish` 

This endpoint allows you to remove an item entirely from an order.
##### Data Params

```json
{
    "_id": "60c73afb0b5f5c23d4a61688",
    "menuItemId": "60c73afb0b5f5c23d4a61689"
}
```

##### Sample Call
```javascript
fetch('http://localhost:3000/orders/editQuantity', {
    "method": "PUT",
    "body": JSON.stringify(/* your data goes here */),
    "headers": {  
        "content-type": "application/JSON"
    }
    .then (res => res.json())
    .then ((data) => {
      //do stuff with your data
    })
})
```
    
##### Success Response
```json
{
"success": true,
"message": "Dish successfully deleted from order",
"status": 200
}
```
        
##### Error Response
```json
{
"success": false,
"message": "Item not found so cannot be deleted from order",
"status": 404
}
```

### Submit final order
`PUT /orders/submitOrder`  

This endpoint will send your order to the restaurant and cannot be taken back.
##### Data Params
```json
{
    "orderId": "60c73afb0b5f5c23d4a61688"
}
```
##### Sample Call
```javascript
fetch('http://localhost:3000/orders', {
    "method": PUT,
    "body": JSON.stringify(/* your data goes here */),
    "headers": 
        {  
            "content-type": "application/JSON"
        }
            .then (res => res.json())
            .then ((data) => {
                //do stuff with your data
            })
})
```
##### Success Response
```json
   {
        "success": true,
        "message": "The order has been placed",
        "status": 200,
        "data": {
            "_id": "60c73afb0b5f5c23d4a61688",
            "name": "isabelle",
            "deliveryAddress": "bse 93b",
            "email": "isabelle@hotmail.co.uk",
            "orderItems": [],
            "isOrderSubmitted": true,
            "timePlaced": "2021-06-17T08:42:53.925Z",
            "totalPrice": 0
          }
    }
```
##### Error Responses
If the order has already been submitted
```json
   {
      "success": false,
      "message": "Order has already been submitted",
      "status": 404
   }
```
If there is an issue connecting to the database
```json
   {
      "success": false,
      "message": "An error has occurred",
      "status": 404
   }
```