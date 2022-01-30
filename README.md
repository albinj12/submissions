# submissions

### problem solving
##### solved problems
- Easy
  - Am I Perfect
  - How many trails to 1
- Medium
  - Hide that PIN!

### node-logistics
- API documentation can be found at http://localhost:3000/api-docs/
- Create, read, update item details
- Create, read delivery vehicle details
- Create, read customer details
- Create, read order details
  - Vehicle availability will be checked when creating order.
  - If no vehicle is available order will not be created
  - If customer details is not present in db, customer details will be added to db before creating order
- Change delivery status
  - invoice will be created when isDelivered is changed to true
  - invoice will contain
    - company name(node-logistics) and address
    - customer name and city
    - orderNo, InvoiceNo, and date
    - ItemId, item name, price
    - Total Price
- All routes are protected with jwt token, if no token is present in  'x-access-token' header, Unauthorized reponse will be send back
- **MongoDB transactions** are used while creating order and changing order status inorder to avoid wrong data in activeOrderCount of delivery vehicle and isDelivered field