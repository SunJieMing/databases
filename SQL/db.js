var mysql = require('mysql');
//var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

var queryFunction = function(sql, cb){
  console.log('queryFunction --------------------------------------------');
  console.log(sql);

  dbConnection.query(sql, function(err, res){
    if (err){
      console.log('query error', err);
    } else {
      return cb(res);
    }
  })
};

exports.findAllMessages = function(cb){
  var sql = 'SELECT * FROM users, messages WHERE users.id = messages.userid ORDER BY messages.createdAt DESC;';
  return queryFunction(sql, cb);
};

exports.findUser = function(username, cb){
  var sql = 'SELECT username FROM users WHERE username ="'+ username +'";';
  return queryFunction(sql, cb);
};

exports.saveUser = function(username, cb){
  console.log('saveUser --------------------------------------------');
  var sql = 'INSERT INTO users ( username ) values("' + username + '");';
  return queryFunction(sql, cb);
};

exports.saveMessage = function(message, userid, roomname, cb){
  console.log('saveMessage --------------------------------------------');

  var sql = 'INSERT INTO messages (message, userid, roomname) values("' + message + '","' + userid + '","' + roomname+ '");';
  return queryFunction(sql, cb);
};
