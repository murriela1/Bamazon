var inquirer = require('inquirer');

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",  /////left this as an empty string, i never inputted a password
	database: "Bamazon_db"


});

connection.connect(function (err){
	if (err) {
		throw err;
	}
});

var requestList = [{
	type: "list",
	message: "Please Choose From the Following Choices",
	choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
	answer: 'choose'
}];

inquirer.prompt(requestList).then(function(results){
	console.log("");
	console.log("Howdy" + results.answer + "Submitted!!");
	console.log("");
	if(results.choose === 'View Products for Sale') {
		console.log("Stuff We're Selling");
		console.log("");
		viewProducts();
	} else if (results.choose === 'View Low Inventory') {
		console.log("Items We're Running Out Of");
		console.log("")
		viewLowInventory();
	} else if (results.choose === 'Add to Inventory') {
		addToInventory();
	} else if (results.choose === 'Add New Product') {
		addProduct();
	}
})

function viewProducts() {
	connection.query('SELECT * FROM Products', function(err, results){
		if (err) {
			throw err
		}
		results.forEach(function(column){
			console.log("-------------------------");
			console.log("itemId: " + row.id);
			console.log("Item: " + row.productName);
			console.log("Price: $" + row.price);
			console.log(row.stockQuantity + "We have this!");
		})
	})
};

function viewLowInventory() {
	connection.query('SELECT * FROM Products', function(err, results){
		if (err) {
			throw err
		}
		for(i = 0; i < results.length; i++) {
			if (results[i].StockQuantity < 3) {
			console.log("-------------------------");
			console.log("itemId: " + results[i].id);
			console.log("Item: " + results[i].ProductName);
			console.log("Price: $" + results[i].Price);
			console.log(results[i].StockQuantity + "We Got This!");
			}
		}
	})
};

function addToInventory() {
	connection.query('SELECT * FROM Products', function(err, results){
		if (err) {
			throw err
		}
			inquirer.prompt([{
				type: "list",
				message: "Which product(s) would you like to add in your inventory?",
				choices: ['IPod', 'DVD Player', 'Diapers', 'Black leggings', 'Jeans', 'Bananas', 'Bose Speaker', 'Suitcase', 'Socks', 'Sony TV'],
				name: "addList"
			}]).then(function(results){
				for(var i=0 ; i < results.length; i++){
					if (results[i].ProductName === res.addList) {
						var chosenProduct = results[i];
						inquirer.prompt([{
							type: 'input',
							message: 'How many do you want to put in here?',
							name: 'quantity'
						}]).then(function(results){
							connection.query('UPDATE Products SET ? WHERE ?',[{
								StockQuantity: (parseFloat(results.quantity) + parseFloat(chosenProduct.stockQuantity))}, {productName: results.addList}],
								function(err, results){
									if (err) {
										throw err
									}
								console.log("");
								console.log("The Number of Items has been changed");
								})
						})	
					}
				}
			})
		})
};


function addProduct(){
	connection.query('SELECT * FROM Products', function(err, results){
		if (err) {
			throw err
		}
		inquirer.prompt([{
			type: "input",
			message: "List The Product",
			name: "product"
		},{
			type: "input",
			message: "What department is this item in?",
			name: "department"
		},{
			type: "input",
			message: "How much does your product cost?",
			name: "price"
		},{
			type: "input",
			message: "How much do you want to put in?",
			name: "quantity"
		}]).then(function(results){
			connection.query('INSERT INTO Products SET ?', {
				ProductName: results.product,
				DepartmentName: results.department,
				Price: results.price,
				StockQuantity: results.quantity
			}, function(err, results){
				if (err) {
					throw err
				}
				console.log("");
				console.log("The" + results.product + "was added");
			})
		})
	})
};