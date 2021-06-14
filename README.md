# year-cohort-projectName
project template repo

### Resources
MongoDB. 

Node.js. 

Express.js. 

RESTful API design.

### Show Menu
Returns json data about dishes.
URL
/dishes/starters  //returns starters
/dishes/mains  //returns mains
/dishes/desserts  //returns desserts
/dishes/refreshments  //returns refreshments
Method:
GET
Data Params
None
Success Response:
Code: 200
Content:
{
"success": true,
"message": "Requested accounts successfully retrieved.",
"status": 200,
"data": [{}, {}, {}]
}
Code: 404
{
"success": false,
"message": "The resource/s requested does not exist at the desired location.",
"status": 404
}



### adding items to an order
- URL
    `/orders/addToOrder`  //adds item to order
  
- Method
    PUT

- Success Response
Code: 200

Content:
{
"success": true,
"message": "Dish successfully added to order",
"status": 200,
}

Error Response
Code: 400
Content:
{
"success": false,
"message": "Item not found so cannot add to order",
"status": 400
}

### adding items to an order
- URL
  `/orders/`  //adds item to order

- Method
  DELETE

- Success Response
  Code: 200

Content:
{
"success": true,
"message": "Dish successfully deleted from order",
"status": 200,
}

Error Response
Code: 404
Content:
{
"success": false,
"message": "Item not found so cannot be deleted from order",
"status": 404
}

### Edit quantities of dishes in orders
- URL
  `/orders/editQuantity`  //edits quantities in order

- Method
  PUT

Success Response
Code: 200
Content:
{
"success": true,
"message": "Your dish quantity was successfully edited.",
"status": 200
}

Error Response
Code: 400
Content:
{
"success": false,
"message": "Dish quantity was not updated",
"status": 400
}

Code: 404
Content:

{
"success": false,
"message": "There is no dish found with that ID.",
"status": 404
}


### Creating a new order
`POST /orders`
This endpoint allows you to create a new order.
##### Data Params
        {
            "name": "Ashley Coles",
			"deliveryAddress": "BA2 6AH",
			"email": "deliciousFood@food.com",
			"orderItems": ["", "", ""]
        }
##### Sample Call
		{
			TBC
		}
##### Success Response
        {
            "success": true,
            "message": "Order created",
            "status": 200,
            "data": [
                {
		            "_id": "60c73afb0b5f5c23d4a61688",
					"name": "Ashley Coles",
					"deliveryAddress": "BA2 6AH",
					"email": "deliciousFood@food.com",
					"isOrderSubmitted": false,
					"timePlaced": "2000-01-01T00:00:00.000+00:00"
					"orderItems": ["", "", ""]
                }
            ]
        }
##### Error Responses
If the wrong datatypes are submitted
{
"success": false,
"message": "Must fulfil all required fields",
"status": 404
}
If the request fails to connect to the database
{
"success": false,
"message": "Database request failed",
"status": 404
}		