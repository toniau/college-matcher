$(document).ready(function(){
    var quoteSource=[
    {
        quote: "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible.",
        name:"Francis of Assisi"
    },
    {
        quote:"Believe you can and you're halfway there.",
        name:"Theodore Roosevelt"
    },
    {
        quote:"It does not matter how slowly you go as long as you do not stop.",
        name:"Confucius"
    },
    {
        quote:"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
        name:"Thomas A. Edison"
    },
    {
        quote:"The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence.",
        name:"Confucius"
    },
    {
        quote:"Don't watch the clock; do what it does. Keep going.",
        name:"Sam Levenson"
    },
    {
        quote:"A creative man is motivated by the desire to achieve, not by the desire to beat others.",
        name:"Ayn Rand"
    },
    {
        quote:"Expect problems and eat them for breakfast.",
        name:"Alfred A. Montapert"
    },
    {
        quote:"Start where you are. Use what you have. Do what you can.",
        name:"Arthur Ashe"
    },
    {
        quote:"Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
        name:"Samuel Beckett"
    },
    {
        quote:"Be yourself; everyone else is already taken.",
        name:"Oscar Wilde"
    },
    {
        quote:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        name:"Albert Einstein"
    },
    {
        quote:"Always remember that you are absolutely unique. Just like everyone else.",
        name:"Margaret Mead"
    },
    {
        quote:"Do not take life too seriously. You will never get out of it alive.",
        name:"Elbert Hubbard"
    },
    {
        quote:"People who think they know everything are a great annoyance to those of us who do.",
        name:"Isaac Asimov"
    },
    {
        quote:"Procrastination is the art of keeping up with yesterday.",
        name:"Don Marquis"
    },
    {
        quote:"Get your facts first, then you can distort them as you please.",
        name:"Mark Twain"
    },
    {
        quote:"Don't sweat the petty things and don't pet the sweaty things.",
        name:"George Carlin"
    },
    {
        quote:"Always do whatever's next.",
        name:"George Carlin"
    },
    {
        quote:"Hapiness is not something ready made. It comes from your own actions.",
        name:"Dalai Lama"
    }

];


$('#crystal').mouseenter(function(evt){
    //define the containers of the info we target
    var quote = $('#quoteContainer p').text();
    var quoteGenius = $('#quoteGenius').text();
    //prevent browser's default action
    evt.preventDefault();
    //getting a new random number to attach to a quote and setting a limit
    var sourceLength = quoteSource.length;
    var randomNumber= Math.floor(Math.random()*sourceLength);
    
    //set a new quote
    for(i=0;i<=sourceLength;i+=1){
        var newQuoteText = quoteSource[randomNumber].quote;
        var newQuoteGenius = quoteSource[randomNumber].name;
        //console.log(newQuoteText,newQuoteGenius);
        var timeAnimation = 500;
        var quoteContainer = $('#quoteContainer');
        //fade out animation with callback
        quoteContainer.fadeOut(timeAnimation, function(){
            quoteContainer.html('');
            quoteContainer.append('<p><mark>'+newQuoteText+'</mark></p>'+'<p id="quoteGenius"><mark>'+'-								'+newQuoteGenius+'</mark></p>');
            //fadein animation.
            quoteContainer.fadeIn(timeAnimation);
        });  
        break;
    };//end for loop

});//end crystal mouse enter function

    $("#buttonContainer").click(function(){
        console.log("I clicked the arrow");
        $("#startAnimation").fadeOut("fast");
        $("#home").fadeIn("slow");
    });

    $("#toForm").click(function(){
        console.log("Switched to form");
        $("#welcome").fadeOut("fast");
        $("#form").fadeIn("slow");
    });

    $("#tuition").slider({});

    $("#pref_state").on('change', function(){
        if($("#personality").val() === ""){
            $("#personality").prop('disabled',true);
            document.getElementById("personality").style.cursor = none;
        } 
        else if($("#pref_state").val() === "notavail") {
            $("#personality").prop('disable', false);
            $("#pref_state").prop('disable', false);
            document.getElementById("personality").style.cursor = pointer;
        }
    });
    
    $("#personality").on('change', function(){
        if($("#pref_state").val() === ""){
            $("#pref_state").prop('disabled',true);
            document.getElementById("pref_state").style.cursor = none;
        } 
        else if($("#personality").val() === "notavail"){
            $("#pref_state").prop('disable', false);
            $("#personality").prop('disable', false);
            document.getElementById("pref_state").style.cursor = pointer;
        }
    });

    $("#submitForm").click(function(){
        console.log("Switched to result");
        $("#form").fadeOut("fast");
        $("#result").fadeIn("slow");
    });
    	
});//end document ready