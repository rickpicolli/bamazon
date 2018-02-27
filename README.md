# Bamazon :package:

### Overview
Bamazon is a Node.js &amp; MySQL digital storefront. This is a command line Node app that mimics a online retailer.

### Node.js
There are two JavaScript files replicate the basics of a simple ecommerce engine:

- `BamazonCustomer.js`
  - Receives orders from customers via the command line and interfaces with mySQL to deplete stock from the store's inventory.
  
  ![Alt text](/assets/screenshot.png?raw=true)
  

- `BamazonManager.js`
  - Mimics the basics of a warehouse management system, providing managers with a list of options to view stock and adjust inventory.
  
  ![Alt text](/assets/screenshot2.png?raw=true)
  
  - A sample of the menu is below:
  
    * View Products for Sale (show the table listing every available item: the item IDs, names, prices, and quantities).
    
    ![Alt text](/assets/screenshot3.png?raw=true)
    
    * View Low Inventory (list all items with an inventory count lower than fifty).
    
    ![Alt text](/assets/screenshot4.png?raw=true)
    
    * Add to Inventory (display a prompt that will let the manager "add more" of any item currently in the store).
    
    ![Alt text](/assets/screenshot5.png?raw=true)
    
    * Add New Product (allow the manager to add a completely new product to the store).    
    
    ![Alt text](/assets/screenshot6.png?raw=true)
    
    
### Node Package Manager (npm)
If you clone this repo down to your computer, note that it has two npm dependencies!
Before running the JavaScript files mentioned above, please run `npm install` in your terminal to download the [inquirer](https://www.npmjs.com/package/inquirer) , [mysql](https://www.npmjs.com/package/mysql) and [cli-table](https://www.npmjs.com/package/cli-table) node packages.

## **Author**

* Rick Picolli - https://github.com/rickpicolli
