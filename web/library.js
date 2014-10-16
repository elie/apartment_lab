"use strict"

function Library() {
}

Library.prototype.books = [];

Library.prototype.add = function(book) {
	this.books.push(book);
};

Library.prototype.destroy = function(id) {
	var allBooks = this.books;
	allBooks.forEach(function(book) {
		if(Number(id) === book.id) {
			var index = allBooks.indexOf(book);
			allBooks.splice(index, 1);
		}
	});
};

Library.prototype.findById = function(id) {
	var foundBook;
	this.books.forEach(function(book){
		if(Number(id) === book.id){
			foundBook = book;
		}
	});
	return foundBook;
};

Library.prototype.all = function() {
	return this.books;
};

module.exports = Library;
