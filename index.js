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

    console.log(req.query['major']);

    var where_major, where_pref_state, where_res_state = '';
    var complete_WHERE = '';


    if(req.query['major'] != ''){
        where_major = 'AND a.Program_Name LIKE "%' + req.query['major'] + '%"'
        console.log(where_major);
    }

    if(req.query['pref_state'] != ''){
        where_pref_state = 'Institution_State = "' + req.query['pref_state'] + '"'
        console.log(where_pref_state);
    }

    if(req.query['res_state'] != ''){
        where_res_state = 'Institution_State = "' + req.query['res_state'] + '"'
        console.log(where_res_state);
    }


    if(personality_type != ''){

        var long_query = 'SELECT b.INSTNM, b.STABBR, c.TUITION1 as INSTATE, (c.TUITION3*1.5) AS OUTSTATE, (b.DIVISOR/a.MB_TYPE_SCORE)*100 AS MATCH_RATE FROM Personality a, HigherEducation3 b, CollegeTuitions c WHERE a.MB_TYPE = "' + personality_type + '" AND (a.MB_TYPE_SCORE = b.P_SCORE) AND b.UNITID=c.UNITID GROUP BY b.INSTNM HAVING MATCH_RATE < 95 ORDER BY MATCH_RATE DESC LIMIT 5;';

        db.query(long_query, function(err, result) {
        	if (err) throw err;
            for(var i=0; i < result.length; i++){
                return_set.push(
                        { 
                            instnm: result[i].INSTNM, 
                            pref_state: result[i].STABBR,
                            instate: result[i].INSTATE,
                            outstate: result[i].OUTSTATE,
                            match_rate: result[i].MATCH_RATE,
                        });
            }
            res.render("result", {results: return_set});
            console.log({results: return_set});
            if (err) throw err;
        });


    } else {

        var complete_WHERE = '';

        var this_query = 'SELECT DISTINCT a.Institution_Name as INSTNM, a.Institution_State as STABBR, TUITION1 AS INSTATE, (TUITION3*1.5) AS OUTSTATE FROM Accreditation2 a, CollegeTuitions b WHERE (a.Institution_IPEDS_UnitID=b.UNITID) '

        if(req.query['major'] == ''){

            if(req.query['pref_state'] != '' && (req.query['res_state'] != '')){

                complete_WHERE = 'AND (' + where_pref_state + ' OR ' + where_res_state + ')';

            }else if(req.query['res_state'] == ''){

                complete_WHERE = 'AND (' + where_pref_state;

            }

            var complete_query = this_query + complete_WHERE + ' LIMIT 5;';
            console.log(complete_query);

            db.query(complete_query, function(err, result) {
            	if (err) throw err;
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


        }else if(req.query['major'] != ''){

            console.log("!!!!-------MAJOR NOT EMPTY----!!!");

            console.log(typeof req.query['pref_state']);
            console.log(typeof req.query['res_state']);

            if(req.query['pref_state'] != '' && (req.query['res_state'] != '')){

                complete_WHERE = 'AND (' + where_pref_state + ' OR ' + where_res_state + ') ' + where_major;

            }else if(req.query['pref_state'] != '' && (req.query['res_state'] == '')){

                complete_WHERE = 'AND (' + where_pref_state + ') ' + where_major;

            }else if(req.query['pref_state'] == '' && (req.query['res_state'] != '')){

                complete_WHERE = 'AND (' + where_res_state + ') ' + where_major;

            }else if(req.query['pref_state'] == '' && req.query['res_state'] == ''){

                complete_WHERE = where_major;
                console.log("FUUUUUUUHHHHH DISSSS\n");
                console.log(where_major);

            }

            var complete_query = this_query + complete_WHERE + ' LIMIT 5;';
            console.log(complete_query);

                db.query(complete_query, function(err, result) {
                	if (err) throw err;
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



    } // else
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
