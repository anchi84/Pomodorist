var workTime = document.getElementById('workTime').value;
var breakTime = document.getElementById('breakTime').value;
var timerEnable = false;
var mode = 'work';
var myAudio = document.getElementById("myAlarm");
var count = 1;
var time = workTime * 60;
var myPomodoro;

function plus(elid) {
    document.getElementById(elid).value++;
    if (!timerEnable) {
        time = document.getElementById(elid).value * 60;
    }
}

function minus(elid) {
    if (document.getElementById(elid).value > 0) {
        document.getElementById(elid).value--;
        if (!timerEnable) {
            time = document.getElementById(elid).value * 60;
        }
    }
}

function getValue(elid) {
    time = document.getElementById(elid).value * 60;
}

function timer() {
    if (timerEnable) {
        if (time === 0) {
            if (mode == 'work') {
                mode = 'break';
                myAudio.play();
                time = document.getElementById('breakTime').value * 60;
                count++;
            } else {
                mode = 'work';
                myAudio.play();
                time = document.getElementById('workTime').value * 60;
                count++;
            }
            
            if (count % 8 === 0) {
              $('h1').html("Take a longer break!");
            } else {
              $('h1').html("DO MORE AND HAVE FUN WITH TIME MANAGEMENT!");
            }
        }

        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        if (seconds < 10)
            seconds = "0" + seconds;
        if (minutes < 10)
            minutes = "0" + minutes;
        document.getElementById("timer").innerHTML = minutes + " : " + seconds;
        time--;
    }
}

function startPause() {
    if (timerEnable === false) {
        myPomodoro = setInterval(timer, 1000);
        timerEnable = true;
        $('#startPause').html("&#10073;&#10073;&nbsp;Pause");
    } else {
        clearInterval(myPomodoro);
        timerEnable = false;
        $('#startPause').html("&#9658;&nbsp;Start");
    }
}


function reset() {
    document.getElementById('workTime').value = 25;
    document.getElementById('breakTime').value = 5;
    clearInterval(myPomodoro);
    time = 0;
    mode = 'break';
    count = 0;
    $('#timer').html("00 : 00");
    if (timerEnable === true) {
        myPomodoro = setInterval(timer, 1000);
    }
}