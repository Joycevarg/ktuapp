var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'joyce',
    password : 'mithra lijo',
    database : 'ASD'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;