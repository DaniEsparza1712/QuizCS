class Answer{
    constructor(name, isCorrect){
        this.name = name;
        this.isCorrect = isCorrect;
    }
}

class Question{
    constructor(name, answers, time) {
        this.name = name;
        this.answers = answers;
        this.time = time;
    }
}

var questions = [
    new Question("¿Dónde se realizan las inscripciones a Labor Social?", [
        new Answer("Student", true), 
        new Answer("Blackboard", false)
    ], 4000),
    new Question("¿Dónde llevas el seguimiento, evaluación y cierre de tu proyecto?", [
        new Answer("Student", false), 
        new Answer("Blackboard", true)
    ], 4000),
    new Question("¿Dónde se encuentra el Curso de Labor Social 2.0?", [
        new Answer("Student", false), 
        new Answer("Blackboard", true)
    ], 4000),
    new Question("¿Qué curso debes aprobar antes de inscribirte a un proyecto?", [
        new Answer("Curso de Labor Social 2.0", true), 
        new Answer("Curso de inducción académica", false)
    ], 4000),
    new Question("¿Con qué calificación mínima se acredita Labor Social 2.0?", [
        new Answer("7", false), 
        new Answer("9", true)
    ], 4000),
    new Question("¿Cuántas veces debes cursar el curso de Labor Social 2.0?", [
        new Answer("Cada semestre", false), 
        new Answer("Una sola vez", true)
    ], 4000),
    new Question("¿Dónde puedes consultar la información general de Labor Social?", [
        new Answer("En Blackboard", true), 
        new Answer("En Google Classroom", false)
    ], 4000),
    new Question("¿Dónde puedes ver tus créditos acumulados de Labor Social?", [
        new Answer("Student", true), 
        new Answer("Blackboard", false)
    ], 4000),
    new Question("¿Qué sucede si tienes indicadores negativos o bloqueos?", [
        new Answer("No puedes inscribirte ni validar créditos", true), 
        new Answer("Puedes inscribirte sin problema", false)
    ], 4000),
    new Question("¿Cuántos créditos valida normalmente un proyecto de Labor Social?", [
        new Answer("120 créditos", true),
        new Answer("30 créditos", false)
    ], 4000),

    new Question("¿Cuántos proyectos puedes inscribir por ciclo de Labor Social?", [
        new Answer("Solo 1 proyecto", true),
        new Answer("Proyectos ilimitados", false)
    ], 4000),

    new Question("¿Cuántos créditos de Labor Social debes completar en total?", [
        new Answer("480 créditos", true),
        new Answer("200 créditos", false)
    ], 4000),

    new Question("¿Qué modalidad de proyectos existe en Labor Social?", [
        new Answer("Presencial, híbrido o virtual", true),
        new Answer("Solo presencial", false)
    ], 4000),

    new Question("¿Cómo puedo contactar a la institución?", [
        new Answer("Correo electrónico, en Blackboard", true),
        new Answer("Contactar a la institución por redes sin estar inscrito", false)
    ], 4000),

    new Question("¿En qué evento conoces proyectos e instituciones participantes?", [
        new Answer("Feria de Labor Social", true),
        new Answer("Semana cultural", false)
    ], 4000),

    new Question("¿Qué debes entregar para cerrar tu proyecto correctamente?", [
        new Answer("Reporte, evaluación y foto de evidencia", true),
        new Answer("Solo la foto", false)
    ], 4000),

    new Question("¿Cuántas palabras mínimo debe tener el reporte de experiencia?", [
        new Answer("150 palabras", true),
        new Answer("50 palabras", false)
    ], 4000),

    new Question("¿Las faltas en Labor Social se pueden justificar?", [
        new Answer("No", true),
        new Answer("Sí, siempre", false)
    ], 4000),

    new Question("¿Quién valida que tus créditos queden liberados?", [
        new Answer("Compromiso Social", true),
        new Answer("Servicios Escolares", false)
    ], 4000),

    new Question("¿Qué pasa si no entregas todo completo y en tiempo?", [
        new Answer("Tu cierre puede ser rechazado", true),
        new Answer("Se valida automáticamente", false)
    ], 4000)
];

var barFill = 10;
var timer = 0;
var totalTime = 2000;
var refreshRate = 20;
var waiting = false;

var questionIndex = -1;
var selectionLen = 5;
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

        var option1Text = document.getElementById("option1");
        option1Text.innerHTML = selectedQuestions[questionIndex].answers[0].name;

        var option2Text = document.getElementById("option2");
        option2Text.innerHTML = selectedQuestions[questionIndex].answers[1].name;

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

function processAnswer(answerId){
    if(!waiting){
        return;
    }
    if(selectedQuestions[questionIndex].answers[answerId].isCorrect){
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

