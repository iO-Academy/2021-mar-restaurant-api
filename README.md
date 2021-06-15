### Collection Structure
##### Collection structure for restaurant.dishes

| Property      | Value     | Type     |
| :------------- | :----------: | :----------: | 
| _id |  Unique menu item id, auto-generated  | String |
| name   | Name of dish | String |
| description   | Description of the dish | String |
| price   | Amount of money the dish costs | Decimal128 |
| dishType | The course type of the dish (starters, mains, desserts, refreshments) | String |

##### Collection structure for orders

| Property      | Value     | Type     |
| :------------- | :----------: | :----------: | 
| _id |  Unique order id, auto-generated  | String |
| name   | Name of customer | String |
| deliveryAddress   | Address of customer where order needs to be delivered | String |
| email   | Customers email | String |
| isOrderSubmitted | Has the customer submitted final order | Bool |
| timePlaced   | Time order was submitted by customer | Date |
| orderItems   | Holds object of each menu item id and quantity that customer has ordered | Array |


## API Calls

### GET

#### Getting items on the menu

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
fetch('http://localhost:3000/dishes')
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