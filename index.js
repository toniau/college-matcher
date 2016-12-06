var express		= require('express');
var app 		= express();
var ejs 		= require('ejs');
//var http		= require('http');

//var server = http.createServer(app);


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));

var mysql		= require('mysql');
var db			= require('./db');

app.get('/', function(req, res) {
    res.render('index2', {title: 'The index page!'})
});


app.get('/result',function(req,res){
    var return_set  = [];
    db.query('SELECT INSTNM, STABBR, TUITION1 FROM HigherEducation3 INNER JOIN CollegeTuitions ON HigherEducation3.UNITID=CollegeTuitions.UNITID LIMIT 5;', function(err, result) {
    	for(var i=0; i < result.length; i++){
    		return_set.push(
    				{ 
    					instnm: result[i].INSTNM, 
    					pref_state: result[i].STABBR,
    					tuition: result[i].TUITION1,
    				});
    	}
    	res.render("result", {results: return_set})
    	console.log({results: return_set});
    	if (err) throw err;
    });
});

 
app.listen(3000,'localhost', function() {
    console.log('Express server started on port %s at %s', this.address().port, this.address().address);
});