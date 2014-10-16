"use strict"

var pg = require('pg');

function DB(database, port, host) {
  this.config = {
    database: database,
    port: port,
    host: host
  };
}

DB.prototype.connect = function(buzzer){
  pg.connect(this.config, function(err, client, done){
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      buzzer(client);
      done();
  });
};

DB.prototype.query = function(statement, params, anotherBuzzer){
  this.connect(function(client){
    client.query(statement, params, anotherBuzzer);
  });
};

DB.prototype.end = function(){
 pg.end();
};

module.exports = DB;