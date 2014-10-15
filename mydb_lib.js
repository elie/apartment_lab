"use strict"

var pg = require('pg');

function DB(database, port, host) {
  this.config = {
    database: database,
    port: port,
    host: host
  };
}

DB.prototype.connect = function(runAfterConnecting){
  pg.connect(this.config, function(err, client, done){
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      runAfterConnecting(client);
      done();
  });
};

DB.prototype.query = function(statement, params, callback){
  this.connect(function(client){
    client.query(statement, params, callback);
  });
};

DB.prototype.end = function(){
 pg.end();
};

module.exports = DB;