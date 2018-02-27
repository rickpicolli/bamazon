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

startingApp();
console.log("\n");
console.log("`7MM￣￣Yp,                                                                ");
console.log("  MM    Yb                                                                ");
console.log("  MM    dP  ,6 Yb.  `7MMpMMMb.pMMMb.   ,6 Yb.  M￣￣MMV ,pW Wq.`7MMpMMMb.  ");
console.log(" MM￣￣bg. 8)   MM    MM    MM    MM  8)   MM  '  AMV 6W'   `Wb MM    MM  ");
console.log("  MM     Y  ,pm9MM    MM    MM    MM   ,pm9MM    AMV  8M     M8 MM    MM  ");
console.log("  MM    ,9 8M   MM    MM    MM    MM  8M   MM   AMV  ,YA.   ,A9 MM    MM  ");
console.log(".JMMmmmd9  `Moo9^Yo..JMML  JMML  JMML.`Moo9^Yo.AMMmmmM `Ybmd9'.JMML  JMML.");
console.log("\n");

function startingApp() {       

    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, response) {
        if (err) throw err;
        displayedTable(response);
    });
}

function itemPurchase(response) {
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "What is the ID of the item you would like to purchase? [Quit with a Q]",
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
            type: "input",
            name: "quantity",
            message: "How many would you like? [Quit with a Q]",
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
        var query = "SELECT * FROM products WHERE ?";
        var totalPrice;


        connection.query(query, {item_id: item}, function(err, response) {
			if (err) throw err;				

				if (quantity <= response[0].stock_quantity) {
					console.log("Placing order...");

                var updateQuery = 'UPDATE products SET stock_quantity = ' + (response[0].stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(updateQuery, function(err, res) {                    
        
    					if (err) throw err;
                        totalPrice = response[0]["price"] * quantity;
    					console.log('Your order was placed! Your total is $' + totalPrice);

    					buyAgain();                        

    					})
				} else {
					console.log("There is not enough product in stock of the product that you choose and your order can not be placed.");
					console.log('Please try again');
                    console.log("\n---------------------------------------------------------------------\n");
                    startingApp();
                
				
				}
		})
	});
}

function displayedTable(response) {
    // console.log("Hey!!!" + response);

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
    itemPurchase(response);
}



function buyAgain() {
    
    console.log("\n_____________________ ");
    console.log("|                      | ");
    console.log("|  Would you like to   |");
    console.log("| place another order? |");
    console.log("|______________________|");
    console.log(" _██_  || ");
    console.log("‹(•.•)›|| ");
    console.log("..(█/'    ");
    console.log("../ |'    ");
      console.log("\n");
  
    
   
   inquirer.prompt([
       {
                type: "confirm",
                name: "buyMore",
                message: "choose 'y' or 'n'"
        }
        ]).then(function(answer) {

            if (answer.buyMore) {
                startingApp();
              

            } else {
                exit();
            }

        })

}


function exit() {

    console.log("\n_____________________ ");
    console.log("|                   | "); 
    console.log("|  Thank you for    |");
    console.log("| shopping with us! |");
    console.log("|___________________|");
    console.log("(|_/) || ");
    console.log("(^.^) || ");
    console.log("/   |/' ");
    console.log("\n---------------------------------------------------------------------\n");
    connection.end();
  
  
}