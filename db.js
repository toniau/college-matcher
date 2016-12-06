var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'masterdb.czirhhcvwhhc.us-east-1.rds.amazonaws.com',
    user     : 'mastersword',
    password : 'mastersword123!',
    database : 'PROJECT_CS336',
    schema: {
    	tableName: 'HigherEducation3',
    }
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;