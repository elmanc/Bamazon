var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3300,

  user: "root",

  password: "",
  database: "bamazon"
});

// to make sure its a integer
function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'Enter a number please';
  }

}

// to prompt user about purchasing
function promptUserPurchase() {

  inquirer.prompt([
    {
      type: 'input',
      name: 'item_id',
      message: 'Enter the Item ID that you would like to purchase please.',
      validate: validateInput,
      filter: Number
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many do you need?',
      validate: validateInput,
      filter: Number
    }
  ])

  .then(function(input) {
 
    var item = input.item_id;
    var quantity = input.quantity;

    var queryDatabase = 'SELECT * FROM products WHERE ?';

    connection.query(queryDatabase, {item_id: item}, function(err, data) {
      if (err) throw err;

      if (data.length === 0) {
        console.log('That Item ID is not valid. Please check and try again.');
        displayInventory();

      } else {
        var productQuantity = data[0];

        if (quantity <= productQuantity.stock_quantity) {
          console.log('Placing your order now!');

          var updateDb = 'UPDATE products SET stock_quantity = ' + (productQuantity.stock_quantity - quantity) + ' WHERE item_id = ' + item;
         
          // to update the inventory
          connection.query(updateDb, function(err, data) {
            if (err) throw err;

            console.log('Your total is $' + productQuantity.price * quantity);

            console.log('Thank you for shopping with us!');
            
            connection.end();
          })
        } else {
          console.log('Sorry, we are out of stock, please try again later.');

          console.log('Please update your order.');

          displayInventory();
        }
      }
    })
  })
}

// to display the current inventory
function displayInventory() {

  queryDatabase = 'SELECT * FROM products';

  // to query the database
  connection.query(queryDatabase, function(err, data) {
    if (err) throw err;

    console.log('Existing inventory: ');
    console.log('...................\n');

    var dataInfo = '';
    for (var i = 0; i < data.length; i++) {
      dataInfo = '';
      dataInfo += 'Item ID: ' + data[i].item_id + ' // ';
      dataInfo += 'Product Name: ' + data[i].product_name + ' // ';
      dataInfo += 'Department: ' + data[i].department_name + ' // ';
      dataInfo += 'Price: $' + data[i].price + '\n';

      console.log(dataInfo);
    }

      promptUserPurchase();
  })
}

// display inventory
function runBamazon() {

  displayInventory();
}

runBamazon();
