var express     = require('express');
var app         = express();
var ejs         = require('ejs');
//var http      = require('http');

//var server = http.createServer(app);


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));

var mysql       = require('mysql');
var db          = require('./db');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'index.html'));
});


app.get('/result',function(req,res){
    var return_set  = [];

    var personality_type = req.query['personality'];

    console.log("PERSONALITY TYPE:" + req.query['personality']);
    console.log(typeof personality_type);
    console.log(personality_type);

    if(personality_type != ''){

        var long_query = 'SELECT b.INSTNM, b.STABBR, c.TUITION1 as INSTATE, (c.TUITION3*1.5) AS OUTSTATE, (b.DIVISOR/a.MB_TYPE_SCORE) AS MATCH_RATE FROM Personality a, HigherEducation3 b, CollegeTuitions c WHERE a.MB_TYPE = "' + personality_type + '" AND (a.MB_TYPE_SCORE = b.P_SCORE) AND b.UNITID=c.UNITID GROUP BY b.INSTNM HAVING MATCH_RATE < 0.95 ORDER BY MATCH_RATE DESC LIMIT 5;';

        db.query(long_query, function(err, result) {
            for(var i=0; i < result.length; i++){
                return_set.push(
                        { 
                            instnm: result[i].INSTNM, 
                            pref_state: result[i].STABBR,
                            instate: result[i].INSTATE,
                            outstate: result[i].OUTSTATE,
                        });
            }
            res.render("result", {results: return_set});
            console.log({results: return_set});
            if (err) throw err;
        });


    } else {

        console.log("IT RAN THE ELSE STATEMENT");

        db.query('SELECT INSTNM, STABBR, TUITION1 AS INSTATE, (TUITION3*1.5) AS OUTSTATE FROM HigherEducation3 INNER JOIN CollegeTuitions ON HigherEducation3.UNITID=CollegeTuitions.UNITID LIMIT 5;', function(err, result) {
            for(var i=0; i < result.length; i++){
                return_set.push(
                        { 
                            instnm: result[i].INSTNM, 
                            pref_state: result[i].STABBR,
                            instate: result[i].INSTATE,
                            outstate: result[i].OUTSTATE,
                        });
            }
            //res.render("result", {results: return_set});
            res.render("result", {results: return_set});
            console.log({results: return_set});
            if (err) throw err;
        });

    }
});





app.get('/personality',function(req,res){
    var return_set  = [];

    var personality_type = 'ESFP';

    var long_query = 'SELECT b.INSTNM, b.STABBR, c.TUITION1 as INSTATE, c.TUITION2 as OUTSTATE, (b.DIVISOR/a.MB_TYPE_SCORE) AS MATCH_RATE FROM Personality a, HigherEducation3 b, CollegeTuitions c WHERE a.MB_TYPE = "' + personality_type + '" AND (a.MB_TYPE_SCORE = b.P_SCORE) AND b.UNITID=c.UNITID GROUP BY b.INSTNM HAVING MATCH_RATE < 0.95 ORDER BY MATCH_RATE DESC LIMIT 5;';


    db.query(long_query, function(err, result) {
        for(var i=0; i < result.length; i++){
            return_set.push(
                    { 
                        instnm: result[i].INSTNM, 
                        pref_state: result[i].STABBR,
                        instate: result[i].INSTATE,
                        outstate: result[i].OUTSTATE,
                    });
        }
        res.render("result", {results: return_set})
        console.log({results: return_set});
        if (err) throw err;
    });
});

 
app.listen(8080, function() {
    console.log('Express server started on port %s at %s', this.address().port, this.address().address);
});
