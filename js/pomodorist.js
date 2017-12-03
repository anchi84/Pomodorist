var workTime = document.getElementById('workTime').value;
var breakTime = document.getElementById('breakTime').value;
//var workTimeId = document.getElementById('workTime').id;
//var breakTimeId = document.getElementById('breakTime').id;
var timerEnable = false;
var mode = 'work';
var myAudio = document.getElementById("myAlarm");
var count = 0;
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
                time = document.getElementById('workTime').value * 60;
                count++;
            }
        }
        /*if(count % 2 == 0) {
        	time = workTime;
        }
        else {
        	time = breakTime;
        }*/

        var minuts = Math.floor(time / 60);
        var seconds = time % 60;
        if (seconds < 10)
            seconds = "0" + seconds;
        if (minuts < 10)
            minuts = "0" + minuts;
        document.getElementById("timer").innerHTML = minuts + " : " + seconds;
        time--;
    }
}

function startPause() {
    if (timerEnable === false) {
        myPomodoro = setInterval(timer, 1000);
        timerEnable = true;
        $('#startPause').html("&#10073; &#10073; Pause");
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
    $('#timer').html("&nbsp;");
    if (timerEnable == true) {
        myPomodoro = setInterval(timer, 1000);
    }

}