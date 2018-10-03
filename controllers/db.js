var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'joyce',
    password : 'mithra lijo',
    database : 'ktu'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;