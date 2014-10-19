"use strict"

var DB = require('./mydb_lib.js');

var db = new DB("library_example_app", 5432, "localhost");

function Book(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

function Library() {
}
// This function should return to be a callback with all of the books
Library.prototype.all = function(callback) {
	// first thing, make an empty array for the books
	var allBooks = [];
	// next, call the db.query method to run some sql and get some data back
	// db.query(STATEMENT, PARAMETERS, CALLBACK)
	db.query("SELECT * FROM books",[], function(err,result){
		if(err) console.log("OOPS something went wrong!", err);
		allBooks = result.rows;
		callback(allBooks);
	});
};

Library.prototype.add = function(title, author, callback) {
	db.query("INSERT INTO books (title,author) VALUES ($1,$2)",[title,author],function(err,result){
		if(err) console.log("OOPS something went wrong!",err);
		callback();
	});
};

Library.prototype.destroy = function(id, callback) {
	db.query("DELETE FROM books WHERE id=$1",[id], function(err,result){
		if (err) console.log("oops I did it again", err);
		callback();
	});
};

Library.prototype.update = function(id, title, author, callback) {
	db.query("UPDATE books SET title = $1, author = $2 WHERE id = $3", [title,author,id], function(err,result){
		if (err) console.log("oops I did it again", err);
		callback();
	});
};

Library.prototype.findById = function(id, callback) {
	var foundBook = {}
	db.query("SELECT * FROM books WHERE id=$1",[id], function(err,result){
		if(err) console.log("OOPS, something went wrong", err);
		foundBook = result.rows[0];
		callback(foundBook);
	});
};

module.exports = Library;
