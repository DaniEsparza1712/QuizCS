class Question{
    constructor(name, isTrue, time) {
        this.name = name;
        this.isTrue = isTrue;
        this.time = time;
    }
}

var questions = [new Question("Debes cumplir 480 créditos para completar la Labor Social.", true, 4000),
    new Question("Pueden acreditarse 120 o 240 créditos en cada programa.", true, 4000),
    new Question("Un programa de 120 créditos toma alrededor de 115 y 130 horas.", false, 4000),
    new Question("Un programa de 240 créditos toma alrededor de 60 y 80 horas.", true, 4000),
    new Question("Hay 2 ciclos de Labor Social cada año.", false, 4000),
    new Question("Puede realizarse más de un programa por ciclo.", false, 4000),
    new Question("Debe asistirse a una sola sesión obligatoria del Taller del Voluntario para realizar la Labor Social.", true, 4000),
    new Question("El correo de Compromiso Social es unete@up.edu.mx.", true, 4000),
    new Question("Las oficinas de Compromiso Social se encuentran dentro del Poliforum Panamericano.", true, 4000),
    new Question("Se puede hacer un programa social fuera de la UP o que no está en el Micrositio de Labor Social y validarlo como Labor Social.", false, 4000)];

var barFill = 10;
var timer = 0;
var totalTime = 2000;
var refreshRate = 20;
var waiting = false;

var questionIndex = -1;
var selectionLen = 10;
var selectedQuestions = [];
var correct = false;

var score = 0;

function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function waitForNextQuestion(){
    setTimeout(timeoutWait, refreshRate);
}

function timeoutWait(){
    if(!waiting){
        return;
    }
    timer += refreshRate;
    barFill = timer * 100 / totalTime;

    var timerBar = document.getElementById("Progress");
    timerBar.style["width"] = barFill + '%';
    if(timer >= totalTime){
        processQuestionEnd();
    }
    else{
        waitForNextQuestion();
    }
}

function displayNext(){
    questionIndex++;
    var popUp = document.getElementById("NextPopup");
    var questionDiv = document.getElementById("Question");

    if(questionIndex < selectionLen){
        popUp.style["display"] = 'none';
        questionDiv.style["display"] = 'block';

        var questionText = document.getElementById("questionText");
        questionText.innerHTML = selectedQuestions[questionIndex].name;
        totalTime = selectedQuestions[questionIndex].time;
        barFill = 100;
        waiting = true;
        waitForNextQuestion()
    }
    else{
        questionDiv.style["display"] = 'none';

        var congratsText = document.getElementById("congratsText");
        congratsText.innerHTML = "SCORE: " + score + "/" + selectionLen;
        congratsText.style['color'] = '#d9dfe6'

        var nextBtn = document.getElementById("nextBtn");
        nextBtn.innerHTML = "REINICIAR";
        nextBtn.addEventListener('click', function (e){
            location.reload();
        });
    }
}

function processAnswer(answer){
    if(!waiting){
        return;
    }
    if(selectedQuestions[questionIndex].isTrue == answer){
        correct = true;
        score ++;
        var scoreHTML = document.getElementById("score");
        scoreHTML.innerHTML = 'SCORE: 0' + score;
    }
    else{
        correct = false;
    }
    processQuestionEnd();
}

function processQuestionEnd(){
    var popUp = document.getElementById("NextPopup");
    popUp.style["display"] = 'block';

    if(questionIndex > -1){
        var congratsText = document.getElementById("congratsText");
        if(correct){
            congratsText.style.color = '#64e056';
            congratsText.innerHTML = "CORRECTO";
        }
        else{
            congratsText.style.color = '#e05656';
            congratsText.innerHTML = "INCORRECTO";
        }
        var nextBtn = document.getElementById("nextBtn");
        nextBtn.innerHTML = "SIGUIENTE";
    }

    waiting = false;
    timer = 0;
    correct = false;
}

function main(){
    for(var i = 0; i < selectionLen; i++){
        var index = randomNumber(0, questions.length);
        selectedQuestions.push(questions[index]);
        questions.splice(index, 1);
    }
    var questionDiv = document.getElementById("Question");
    questionDiv.style["display"] = 'none';
}

