/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */

var surname;
var soundHandle = new Audio();
//var soundcounter= 0;
var triggered=false;
var nosound=true;
var params = new URLSearchParams(window.location.search.slice(1));
var color1 = '#ffc0cb';
var color2 = '#7FB1ED';
var color4 ='#969696';
var color3 = 'linear-gradient(90deg, rgba(255,192,203,1) 0%, rgba(182,182,242,1) 50%, rgba(127,177,237,1) 100%)';
var color3a = '-moz-linear-gradient(90deg, rgba(255,192,203,1) 0%, rgba(182,182,242,1) 50%, rgba(127,177,237,1) 100%)';
var color3b = '-webkit-linear-gradient(90deg, rgba(255,192,203,1) 0%, rgba(182,182,242,1) 50%, rgba(127,177,237,1) 100%)';
var colortxt1 = '#F860AA';
var colortxt2= '#0066FFFF';
var colortxt3= '#424242';
//Select the background color
var color =color4;
//Select the text color
var colortxt = colortxt3;
var gen;
var gender = ["","","It's Twin Boys!","","","Its Twin Girls!","","It's a Boy & a Girl"];
var col = ["","","blue","","","pink","","pink and blue"];
var w = ["","","Twin Boys","","","Twin Girls","","Boy & Girl Twins"];

var gendertext4= "It is a Demo!";

//Select the gender text
var gendertext = gendertext4;

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
};
function randomInRangeint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
function confetti_effect() {
    soundHandle.src = 'audio/celebrate.mp3';
    $("#resetbutton").hide();
    $('#tboy').show();
    $('#tboy').text(gendertext);
    $('#tboy').css('color',colortxt);
    $('#twins').hide();
    $('#boy').hide();    
    $('#girl').hide();
    document.getElementsByTagName("body")[0].style.backgroundColor = color;
    if (color != color3) {
        color3a = color;
        color3b = color;
        $('#or').hide();
    } else {
        $('#boy').text("a Boy");
        $('#or').text(" & ");
        $('#girl').text("a Girl");
    }
    
    document.getElementsByTagName("body")[0].style.backgroundImage = 'none';
    document.getElementById("H3").insertAdjacentHTML('afterend', "<h4 id='testtext' style='white-space:normal'> In the real product you buy, here it will say '" + gender[gen] + "' with " + col[gen] +" background color. And the wheel will stop at " + w[gen] + "</h4>");
    $('body').css({
        'background-image:' : color,
        'background-image:' : color3a,
        'background-image:' : color3b,
    });

    $('#H3').hide();
    $('#H4').hide();
    if(triggered==true) {
        return;
    }
    if (!nosound) {
        soundHandle.volume=0.5;
        soundHandle.play();
    }
    triggered=true;
   // do this for 10 seconds
   var duration = 7 * 1000;
   var end = Date.now() + duration;
   var defaults = { startVelocity: 10, spread: 360, ticks: 70, zIndex: 0 };
   var particleCount = 5 ;
   (function frame() {
   // launch a few confetti from the left edge
   confetti({...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: [colortxt]}
   );
   // and launch a few from the right edge
   confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },colors: [colortxt]}
   );

   // keep going until we are out of time
   if (Date.now() < end && triggered==true) {
       requestAnimationFrame(frame);
       
       return;
   }
   $("#resetbutton").show();
   
   }());
          
 };

 export {confetti_effect};

    function playticksound() {
        if (!nosound ) {
            createjs.Sound.volume = 0.2;
            createjs.Sound.play("sound");
        }

    }
export {playticksound};

    function supportsCanvas() {
        return !!document.createElement('canvas').getContext;
    };
    
    

    function onResetClicked() {
        //$("#resetbutton").hide();

        $('#tboy').hide();
        $('#boy').show();
        
        $('#or').text(" or ");
        $('#boy').text("Boy");
        $('#girl').text("Girl");
        
        $('#twins').show();
        $('#or').show();
        $('#girl').show();
        //$('.images').show();
        document.getElementsByTagName("body")[0].style.backgroundColor = "#FFFFFF";
        document.getElementsByTagName("body")[0].style.backgroundImage = 'url(images/background.jpg)';
        document.getElementById("resetbutton").value = "Spin!";
        document.getElementById('testtext').remove();

        $('#H3').show();
        $('#H4').show();
        triggered = false;
        confetti.reset();
        soundHandle.pause();
        soundHandle.currentTime = 0;    
        return false;
    };
    export {onResetClicked};

    function getGen() {
        if (params.get('gen')!=null) {
            gen = params.get('gen');
            return params.get('gen');
        }
    
       }
        export {getGen};
    
    function initPage() {
        var i, i1;
        surname = params.get('surname');
        if (surname !=null && surname.replace(/\s/g, '').length) {
            $("#baby").text('baby ' + surname+'(s)');}
        else {
            $("#baby").text('the baby(ies)');
            surname="the";
            document.getElementById('surname').style.fontWeight="normal";
        }
        
        //document.getElementById('intro').innerHTML= "This is a gender reveal spin the wheel for <strong>" + surname + "</strong> family. It contains high level sound. Do you want to continue with sound?";
        document.getElementById('surname').innerHTML= surname;
        document.getElementById('id01').style.display='block';
        $('.nosoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display='none';
            nosound=true;
        });
        $('.withsoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display='none';
            nosound=false;
            soundHandle = document.getElementById('soundHandle');              
            soundHandle.autoplay = true;
            soundHandle.muted=false;
            soundHandle.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            soundHandle.play();
            soundHandle.pause();
            createjs.Sound.registerSound({src:"audio/tick.mp3", id:"sound"});
    
        });
       
    };
    
    /**
     * Handle page load
     */
    $(function() {
        if (supportsCanvas()) {
            initPage();
        } else {
            $('#scratcher-box').hide();
            $('#lamebrowser').show();
        }
    });
        