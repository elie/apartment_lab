
## Node and Postgres

###Goals for today

- Learn how to talk to databases in JavaScript
- Apply principles of DRY and Object Oriented design
- Avoid the pitfalls of a-synchronicity 
- Have everything you need to implement your first **full stack** web app!

###Before we begin

Todays lesson is organized in branches. Follow along by switching to *topic branches* as we make progress, for example:

	git checkout basic

How to tell which branch I'm in?

	git branch
	
There's no need to type along. However, feel free to annotate code with comments. Check in changes before switching to the next topic/branch:

	// save my changes, comments, annotations
	git commit -m'added my comments'
	// push changes in branch to github
	git push origin basic   <- branch name!
	// move to next topic
	git checkout dry 

###Resources

[pg package](https://github.com/brianc/node-postgres) on GitHub.

###1 Setup 

Fork, clone this repo.

**Branch:** `master`
 
Setup sample DB used in today's lecture. In root folder, fire up `psql` and run:

	\i setup.sql

Use `psql` commands to check that table and sample data was created.
	
###2 Using postgres api

**Branch:** `basic`

No surprise here (pg is already a dependency in package.json):

	npm install

Run `node basic.js` and verify output:

```
{ id: 1, title: 'The Taker', author: 'Lisa' }
{ id: 2, title: 'Tin Drum', author: 'Grass' }
```

Inspect `basic.js`. In order to use pg, require it.

	var pg = require('pg');

####2.1 Configure db connection

```
var config = {
    database: "library_example_app",
    port: 5432,
    host: "localhost"
};
```

####2.2 Connecting to db

Generally you will access the postgres server through a pool of `clients`. The `connect` method provides a callback that has a handle to a fresh `client` object. 

`Client` is the main interface point with the postgres server. It's used to run SELECT, INSERT, UPDATE and DELETE queries against the database. See [Client API reference](https://github.com/brianc/node-postgres/wiki/Client).


```
pg.connect(config, function(err, client, done){
	// We are connected to the DB ...
	// ... check 'err' to make sure!
	// 'client' represents the connection, it runs SQL queries
	// When done, call 'done()' to release client back to pool.
}
```

####2.3 Running queries

```
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
```
This is pretty much a mess. It's hard to follow what's going on, the callback chain is not very clear. There's a lot of redundancy in the code.

###3 Don't repeat yourself

That's not very DRY! We can do better than that.

**Branch:** `dry`

Explore `dry.js`.

Introducing the notion of a **db wrapper** on top of *native* pg


```
var db = {};
db.config = {
    database: "library_example_app",
    port: 5432,
    host: "localhost"
};

db.connect = function(buzzer) {
  pg.connect(db.config, function(err, client, done){
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      buzzer(client);
      done();
  });
};

db.query = function(statement, params, anotherBuzzer){
  db.connect(function(client){
    client.query(statement, params, anotherBuzzer);
  });
};
```

###4 Encapsulate pg api in Objects

Where are the Objects? ... SUPERDRY!

**Branch:** `superdry`

Explore `mydb_lib.js` and `superdry.js`.

###5 Taking our DB Object to the web

**Branch:** `web`

`cd` into `web` directory and run `npm install`. Fire up web server:

	nodemon

Go to [localhost](http://localhost:3000/books)

So what's going on here? Compare to Tuesday's version:

- `app.js` has gotten pretty thin ...
- books array is gone (used for transient storage)
- `Book` object is gone, no more idCounter
- new `Library` package that encapsulates `Book` and `Library` (list of books)
- `Library` also encapsulates DB, see require `mydb_lib.js`. The fact thet the app is using a database is hidden from the "controller". This is good design. 

Take a look how `/books` route is handled.

###Weekend Lab

Finish the web app and make books truly persistent. Look for TODO comments in `app.js` and `library.js`. These are the only JavaScript files you will need to touch. 

If not done Tuesday, add a "show book" page and implement the corresponding route.

