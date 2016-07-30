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
	console.log ("you successfully connected to your DB!");
});

connection.query('SELECT * FROM products', function(err, results) {
	if (err) {
		throw err;
	}
	console.log (results);

	results.forEach(function (row){
		console.log('productName:', row.productName);
		console.log('departmentName:', row.departmentName);
		console.log('price:', row.price);
		console.log('stockQuantity:', row.stockQuantity);


	});

});

// prompts user for the ID of the product they wish to buy
	inquirer.prompt([
		{
		type: "input",
		message: "What is the itemID of the product you wish to buy?",
		name: "id"
		}, {

			// prompts the user to find out how many of the product they wish to buy

			type: "input",
			message: "How many do you wish to buy?",
			name: "amount"

		}]).then(function (answers) {

			//Checks if the store has enough to sell the user; if not, say "Insufficient quanitity" and stop order from going through
			var idItem = answers.id;

			connection.query('SELECT * FROM products WHERE ?', {itemID: idItem}, function(err, data) {
				if (err) throw err;
				
			var item = data[0];

				if (answers.amount < item.stockQuantity) {

			var amountLeft = item.stockQuantity - answers.amount;

			var sale = answers.amount * item.price;

			connection.query('UPDATE products SET ? WHERE ?', [{
					stockQuantity: amountLeft
					itemID: idItem}], 

						function(err, data) {
						if (err) throw err;
						
						console.log('The total for your purchase is $' + sale + '.');

						console.log('Number of ' + item.productName + '(s) left: ' + amountLeft);

					});

				} 

				else {

						console.log("Insufficient quantity.");
					return "Insufficient quantity.";
				} // end of else you can't buy this

				// put total cost into totalSales column for the related department

			connection.query('SELECT * FROM departments WHERE ?', {departmentName: item.departmentName}, function(err, data) {
						if (err) throw err;

			var total = sale + data[0].totalSales;

			connection.query('UPDATE departments SET ? WHERE ?', [{
						totalSales: total}, 
						{ departmentName: item.departmentName }], 
						function(err, data) 
						{ if (err) throw err;
						
						console.log(item.departmentName + "'s total sales are: $" + total);

					}); 

				}); 
			}); 
	}); 
}; 