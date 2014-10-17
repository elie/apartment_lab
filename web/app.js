"use strict"

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Library = require('./library.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

var library = new Library();

//Home
app.get('/', function(req, res){
  res.render('home');
});

//Index
app.get('/books', function(req, res){
  //DONE!
  console.log("/BOOKS")
  var leBooks = library.all();
  res.render('library/index', {allBooks: leBooks});
});

//New
app.get('/books/new', function(req, res){
  //DONE
	res.render("library/new");
});

//Create
app.post('/books', function(req, res) {
	//TODO
  console.log("/books -> Implement me.");
  // library.add ....
  res.redirect('/books'); 
});

//Show
app.get('/books/:id', function(req, res) {
  var id = req.params.id;
  //TODO
  console.log("/books -> Implement me.");
  // library.findById ...
  // Add library/show.ejs page and render it with found book
  // Add "Show" link on '/books' page.
  res.send("implement show book. showing book " + req.params.id);
});

//Edit
app.get('/books/:id/edit', function(req, res) {
	var id = req.params.id;
  //TODO
  console.log("/books/:id/edit -> Implement me.");
  // library.findById ...
  var foundBook = {};
  res.render('library/edit', {book: foundBook});
});

//Update
app.put('/books/:id', function(req, res) {
	var id = req.params.id;
  //TODO
  console.log("/books/:id -> Implement me.");
  // library.update ...
  res.redirect('/books');
});

//Delete
app.delete('/books/:id', function(req, res) {
	var id = req.params.id;
  //TODO
  // library.destroy ...
  res.redirect('/books');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});