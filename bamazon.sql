DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,5) default 0,
    stock_quantity INT(40) default 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jigsaw Puzzle", "games", 30.50, 300),
("Nintendo Switch", "games", 250.00, 274),
("Javascript and JQuery", "book", 23.10, 250),
("Nike Shorts", "Clothing", 18.35, 273),
("Men's Titanium Watch", "Accessories", 200.00, 157),
("Armani Sunglasses", "Accessories", 50.00, 374),
("Royal Canin Cat Food", "Pet", 38.99, 490),
("Royal Canin Dog Food", "Pet", 32.99, 490),
("Dog's Chew Toy", "Pet", 11.99, 340);
