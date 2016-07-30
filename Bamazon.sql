CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE products (
	itemID INTEGER(10) AUTO_INCREMENT NOT NULL,
	productName VARCHAR(30) NOT NULL,
	departmentName VARCHAR(30) NOT NULL,
	price INTEGER(10) NOT NULL,
	stockQuantity INTEGER(10) NOT NULL,
	PRIMARY KEY (itemID) 
);

INSERT INTO products (productName, departmentName, price, stockQuantity) VALUES ("IPod", "Electronics", 250, 100);
INSERT INTO products (productName, departmentName, price, stockQuantity) VALUES ("DVD Player", "Electronics", 100, 40);
INSERT INTO products (productName, departmentName, price, stockQuantity) VALUES ("Diapers", "Baby", 20, 500);
INSERT INTO products (productName, departmentName, price, stockQuantity) VALUES ("Black leggings", "Clothing", 10, 30);
INSERT INTO products (productName, departmentName, price, stockQuantity) VALUES ("Jeans", "Clothing", 20, 200);
INSERT INTO products (productName, departmentName, price, stockQuantity) VALUES ("Bananas", "Food", 2, 10);
INSERT INTO products (productName, departmentName, price, stockQuantity) VALUES ("Bose Speaker", "Electronics", 350, 200);
INSERT INTO products (productName, departmentName, price, stockQuantity) VALUES ("Suitcase", "Luggage & Travel", 50, 75);
INSERT INTO products (productName, departmentName, price, stockQuantity) VALUES ("Socks", "Clothing", 5, 100);
INSERT INTO products (productName, departmentName, price, stockQuantity) VALUES ("Sony TV", "Electronics", 250, 200);


SELECT * FROM products;

