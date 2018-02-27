var inquirer = require ("inquirer");
var mysql = require ("mysql");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",//put your MySQL password in here
    database: "bamazon"
});

console.log("\n");
console.log("`7MM￣￣Yp,                                                                ");
console.log("  MM    Yb                                                                ");
console.log("  MM    dP  ,6 Yb.  `7MMpMMMb.pMMMb.   ,6 Yb.  M￣￣MMV ,pW Wq.`7MMpMMMb.  ");
console.log(" MM￣￣bg. 8)   MM    MM    MM    MM  8)   MM  '  AMV 6W'   `Wb MM    MM  ");
console.log("  MM     Y  ,pm9MM    MM    MM    MM   ,pm9MM    AMV  8M     M8 MM    MM  ");
console.log("  MM    ,9 8M   MM    MM    MM    MM  8M   MM   AMV  ,YA.   ,A9 MM    MM  ");
console.log(".JMMmmmd9  `Moo9^Yo..JMML  JMML  JMML.`Moo9^Yo.AMMmmmM `Ybmd9'.JMML  JMML.");
console.log("\n\n");



function startingApp() {       

    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, response) {
        if (err) throw err;
        managerActions();
    });
}

startingApp();

function managerActions() {
	inquirer.prompt([
	{
		type: "list",
		name: "actions",
		message: "Please select an option below: ",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}
	]).then(function(response) {
		if (response.actions === "View Products for Sale") {
			displayedTable(response);
		}
		else if (response.actions === "View Low Inventory") {
			displayLowInventory();
		}
		else if (response.actions === "Add to Inventory") {
			addInventory();
		}
		else {
			addNewProduct();
		}
	})
}

function displayedTable(response) {
    // console.log("Hey!!!" + response);

    var table = new Table({
        head: ["Item ID#", "Product", "Department", "Price", "In Stock"],
        colAligns: ['center'],
    });

    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, response) {
        if (err) throw err;

    for (var i = 0; i < response.length; i++) {
        var arr = Object.keys(response[i]).map(function(key) {
        return response[i][key];
     });
        table.push(arr);
    }
    // showing table
    console.log(table.toString());
    actionAgain();
     });
}

function displayLowInventory() {
	query = "SELECT * FROM products WHERE stock_quantity < 50";

	connection.query(query, function(err, response) {
		if (err) throw err;

		console.log("Showing low inventory items (below than 50): ");

		var table = new Table({
        head: ["Item ID#", "Product", "Department", "Price", "In Stock"],
        colAligns: ['center'],
    });

    for (var i = 0; i < response.length; i++) {
        var arr = Object.keys(response[i]).map(function(key) {
        return response[i][key];
     });
        table.push(arr);
    }
    // showing table
    console.log(table.toString());
    actionAgain();
	})
	}


function addInventory() {

	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID of the product you want to update. [Quit with a Q]',
			validate: function(value) {
                if (value === "Q") {
                 exit();
                 connection.end(); 
             } 
             else if ((value >= 1) && (value <=10)) {
                return true;
              
             
            } else {
                console.log("\n\nWe don't have the product that you looked for. Please enter the right product number.\n\n")
            }
        }
        },
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to add? [Quit with a Q]',
			validate: function(value) {
                if (value === "Q") {
                 exit()
                 connection.end();  
             } else {
                return true;
             }
         }
        }
	]).then(function(answer) {
		

		var item = answer.item_id;
        var quantity = answer.quantity;
		var query = 'SELECT * FROM products WHERE ?';

		connection.query(query, {item_id: item}, function(err, response) {
			if (err) throw err;

				console.log('Updating Inventory...');

				// Construct the updating query
				var updateQuery = 'UPDATE products SET stock_quantity = ' + parseInt(response[0].stock_quantity) + parseInt(quantity) + ' WHERE item_id = ' + item;
			

				console.log('Stock count for Item ID ' + item + ' was updated to ' + (response[0].stock_quantity + quantity) + '.');
					console.log("\n---------------------------------------------------------------------\n");

				// Update the inventory
				connection.query(updateQuery, function(err, response) {

					if (err) throw err;

					actionAgain();
				})
			})
		})
	}

function addNewProduct() {

	// Prompt the user to enter information about the new product
	inquirer.prompt([
		{
			type: 'input',
			name: 'product_name',
			message: 'Please enter the new product name.',
		},
		{
			type: 'input',
			name: 'department_name',
			message: 'Which department does the new product belong to?',
		},
		{
			type: 'input',
			name: 'price',
			message: 'What is the price per unit?',
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many items are in stock?',
		}

]).then(function(answer) {
		// console.log('input: ' + JSON.stringify(input));

		console.log("Adding New Item: \n");    
		console.log("\nproduct_name = " + answer.product_name);  
		console.log("\ndepartment_name = " + answer.department_name); 
		console.log("price = " + answer.price);  
		console.log("stock_quantity = " + answer.stock_quantity);

		// Create the insertion query to add new information to MySQL
		var query = 'INSERT INTO products SET ?';

		// Adding new product
		connection.query(query, answer, function (error, results) {
			if (error) throw error;

			console.log("New product has been successfully added to the inventory");
			console.log("\n---------------------------------------------------------------------\n");

			// End the database connection
			actionAgain();
		});
	})
}

function actionAgain() {
    
    console.log("\n_____________________ ");
    console.log("|                      | ");
    console.log("|  Would you like to   |");
    console.log("|  do anything else?   |");
    console.log("|______________________|");
    console.log(" _██_  || ");
    console.log("‹(•.•)›|| ");
    console.log("..(█/'    ");
    console.log("../ |'    ");
      console.log("\n");
  
    
   
   inquirer.prompt([
       {
                type: "confirm",
                name: "otherAction",
                message: "choose 'y' or 'n'"
        }
        ]).then(function(answer) {

            if (answer.otherAction) {
                managerActions();
              

            } else {
                exit();
            }

        })

}


function exit() {

    console.log("\n_______________________ ");
    console.log("|                        | "); 
    console.log("|  Thank you for coming! |");
    console.log("|   See you next time!   |");
    console.log("|________________________|");
    console.log("(|_/) || ");
    console.log("(^.^) || ");
    console.log("/   |/' ");
    console.log("\n---------------------------------------------------------------------\n");
    connection.end();
  
  
}