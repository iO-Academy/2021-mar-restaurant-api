# Restaurant API

## Resources
MongoDB.

Node.js.

Express.js.

RESTful API design.


### Collection Structure
##### Collection structure for restaurant.starters, restaurant.mains, restaurant.desserts, restaurant.refreshments

| Column 1       | Column 2     | 
| :------------- | :----------: | 
| _id |  Unique menu item id, auto-generated  | String |
| name   | Name of dish | String |
| description   | Description of the dish | String |
| price   | Amount of money the dish costs | Decimal128 |

##### Collection structure for orders

| Column 1       | Column 2     | 
| :------------- | :----------: | 
| _id |  Unique order id, auto-generated  | String |
| name   | Name of customer | String |
| deliveryAddress   | Address of customer where order needs to be delivered | String |
| email   | Customers email | String |
| isOrderSubmitted | Has the customer submitted final order | Bool |
| timePlaced   | Time order was submitted by customer | Date |
| orderItems   | Holds object of each menu item id and quantity that customer has ordered | Arrray |

## API Calls

### GET

#### Getting items on the menu

Returns a JSON string of dishes (option for all dishes, and dishes by type). No authentication required.


`GET /dishes`


`GET /dishes/starters`  //returns starters


`GET /dishes/mains`  //returns mains


`GET /dishes/desserts`  //returns desserts


`GET /dishes/refreshments`  //returns refreshments


##### Sample Call
	
	fetch('http://localhost:3000/dishes')
		.then (res => res.json())
		.then ((data) => {
			//do stuff with your data
			})
   	 })

##### Success Response
	
	{
		"success": true,
		"message": "Requested accounts successfully retrieved.",
		"status": 200,
		"data": [{}, {}, {}]
	}
	
##### Error Response

	{
		"success": false,
		"message": "The resources requested do not exist at the desired location.",
		"status": 404
	}
	
#### Retrieving final order

`GET /orders/:id`

##### Sample Call

	fetch('http://localhost:3000/orders/:id')
		.then (res => res.json())
		.then ((data) => {
			//do stuff with your data
			})
   	 })

##### Success Response

	{
		"success": true,
		"message": "Final order successfully recieved",
		"status": 200,
		"data": [{"menuItemId": "" , "quantity": "1"]
	}

##### Error Response

	{
		"success": false,
		"message": "The resources requested do not exist at the desired location.",
		"status": 404
	}

### POST: 

#### Creating a new order

`POST /orders`

This endpoint allows you to create a new order.


##### Data Params

        {
        	"name": "Ashley Coles",
		"deliveryAddress": "BA2 6AH",
		"email": "deliciousFood@food.com",
		"orderItems": [{"menuItemId": "" , "quantity": "1"]
        }


##### Sample Call


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
			"orderItems": [{"menuItemId": "" , "quantity": "1"]
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


### PUT

#### Adding items to an order

`PUT /orders/addToOrder`

##### Data Params
	
	{
        	"orderId": "60c73afb0b5f5c23d4a61688"
         	"orderItems": [{"menuItemId": "60c73afb0b5234f3d4a61688", "quantity": 4}]
        }
	
##### Sample Call
	
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
	
##### Success Response

	{
		"success": true,
		"message": "Dish successfully added to order",
		"status": 200,
	}

##### Error Response

	{
		"success": false,
		"message": "Item not found so cannot add to order",
		"status": 400
	}


### Edit quantities of dishes in orders

`PUT /orders/editQuantity`

##### Data Params

	{
           "_id": "60c73afb0b5f5c23d4a61688"
           "orderItems": [{"menuItemId": "60c73afb0b5f5c23d4a61688" , "quantity": 1}]
        }

##### Sample Call

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

##### Success Response

	{
		"success": true,
		"message": "Your dish quantity was successfully edited.",
		"status": 200
	}

##### Error Response
	
If the DB fails to update the dish quantity:
	
	{
		"success": false,
		"message": "Dish quantity was not updated",
		"status": 400
	}
	
If the dish ID is incorrect:
	
	{
		"success": false,
		"message": "There is no dish found with that ID.",
		"status": 404
	}


#### Removing an item (in any quantity) from an order

`PUT /orders/removeDish`

This endpoint allows you to remove an item entirely from an order.

##### Data Params

	 {
           "_id": "60c73afb0b5f5c23d4a61688"
           "orderItems": [{"menuItemId": "60c73afb0b5f5c23d4a61689", "quantity": 1}]
        }

##### Sample Call

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

##### Success Response
	{
		"success": true,
		"message": "Dish successfully deleted from order",
		"status": 200,
	}

##### Error Response
	
	{
		"success": false,
		"message": "Item not found so cannot be deleted from order",
		"status": 404
	}

### Submit final order

`PUT /orders/submitOrder`

This endpoint will send your order to the restaurant and cannot be taken back. 

##### Data Params

	 {
           "_id": "60c73afb0b5f5c23d4a61688"
        }


##### Sample Call

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


##### Success Response
	{
		"success": true,
		"message": "Order submitted",
		"status": 200,
		"data": [
					{
						"_id": "60c73afb0b5f5c23d4a61688",
						"name": "Ashley Coles",
						"deliveryAddress": "BA2 6AH",
						"email": "deliciousFood@food.com",
						"isOrderSubmitted": true,
						"timePlaced": "2000-01-01T00:00:00.000+00:00"
						"orderItems": [{},{}]
                    }
				],
		"deliveryTime": "2000-01-01T00:00:00.000+00:00"
	}

*this success response may change 

##### Error Response

	{
		"success": false,
		"message": "The resource/s requested does not exist at the desired location.",
		"status": 404
	}


