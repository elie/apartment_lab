"use strict"

var pg = require('pg');

function DB(database, port, host) {
  this.config = {
      database: database,
      port: port,
      host: host
  };
}

// this is a helper method, that lets us connect to the database and it takes in 1 parameter....a function
DB.prototype.connect = function(callback){
  // first thing we do is use the pg module to connect to the database
  pg.connect(this.config, function(err, client, done){
    // console.log("FINALLY!!!! THE CLIENT!!!!")
    // console.log(client);
      // if there is an error, yell at me
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      // if there is no error, run the callback function, passing in the client as a parameter
        // we now have access to client, which lets us do things like query a database
      callback(client);
      // finally, run the last parameter (done) of the second parameter (function(err,client,done))
      // of the pg.connect method and call it a day.
      done();
  });
};


// this function is first going to run the DB.prototype.connect method and get the party started
DB.prototype.query = function(statement, params, anotherCallback){
  // first thing I do is run .connect. This takes in a callback function with the parameter of "client"
  // wtf is client? Great question you ask...it's what we got when we ran pg.connect and made a
  // successful connection. Client is an object that has a bunch of useful properties and methods
    // the big one we're going to use, is called .query
  this.connect(function(client){
    // .query takes in 3 paramteters.
      // 1 - statement -> "SELECT * FROM books WHERE id = $1;"
      // 2 - params -> [req.body.id]
      // 3 - anotherCallback -> is a function that I execute once my statement has ran
        // inside of here -> I will have information about my query (err, result)
    client.query(statement, params, anotherCallback);
  });
};

// finally, one last function to close our connection to the postgres database. Don't worry about this guy
DB.prototype.end = function(){
 pg.end();
};

// send the DB constructor function and all of it's methods off to another file (library.js)
module.exports = DB;