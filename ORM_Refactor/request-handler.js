var db = require('./db');
var serverHelpers = require('./server-helpers');
// wham! magic.
var parseData = serverHelpers.collectData;
var saveMessage = db.saveMessage;
var saveUser = db.saveUser;
var findMessages = db.findAllMessages;
var findUser = db.findUser;


exports.postMessage = function(req, res) {
  // declare this variable so we can retain access to it throughout the entire promise chain.
  var message;

  var resultsCallback = function (results) {
    console.log('resultsCallback', results);
      var chat = {
        message: message.message,
        userid: results.insertId,
        roomname: message.roomname
      };

      saveMessage(chat.message, chat.userid, chat.roomname, function () {
        console.log('1------------------------------')
        serverHelpers.sendResponse(res, message);
        console.log('2------------------------------')

      });
  };

  parseData(req, function(_, msg) {
      message = msg;
      findUser(msg.username, function (err, results) {
        // no results/0 results
        if (!results || !results.length) {
                  console.log('3------------------------------')

          // create the user, then post the message
          saveUser(message.username, resultsCallback);
                  console.log('3b------------------------------')

        } else {
                  console.log('4------------------------------')
          // user exists, post the message to this user
          resultsCallback(results);
        }
      });
  });
};

exports.getMessages = function(req, res) {
  console.log('getMessages---------------------------------------------')
  findMessages(function(err, messages) {
      serverHelpers.sendResponse(res, messages);
  });
};

exports.sendOptionsResponse = function(req, res) {
console.log('sendOptionsResponse---------------------------------------------')

  serverHelpers.sendResponse(res, null);
};
