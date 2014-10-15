"use strict"

var pg = require('pg');

var config = {
    database: "library_example_app",
    port: 5432,
    host: "localhost"
};

// SELECT SOME DATA
pg.connect(config, function(err, client, done){
		// Check for errors
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }
        // Client object represents a connection object
        // Let's retrieve all books
        client.query("SELECT * FROM BOOKS", function(err, resultSet){
	        if (err) {
	            console.log(err);
	        }
	        // resulSet represents, well, the set of results returned from the DB.
	        // It's an array containing rows
        	resultSet.rows.forEach(function(aRow){
          		console.log(aRow);
        	});
        });

        //call `done()` to release the client back to the pool
        done();
});

// INSERT SOME DATA
pg.connect(config, function(err, client, done){
		// Check for errors
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }
        // Client object represents a connection object
        // Let's retrieve all books
        client.query("INSERT INTO books (title, author) VALUES ($1, $2)",
					["The Great Gatsby", "Fitzgerald"], 
					function(err, resultSet){
	        if (err) {
	            console.log(err);
	        }
        	resultSet.rows.forEach(function(aRow){
          		console.log(aRow);
        	});
        });

        //call `done()` to release the client back to the pool
        done();
});

pg.end();
