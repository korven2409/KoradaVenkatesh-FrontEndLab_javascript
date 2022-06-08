function Quiz(questions){
    this.score =0;
    this.questions = questions;
    this.questionIndex =0;
}

function Question(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function(){
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.isCorrectAnswer = function(choice){
    return this.answer===choice;
}

function loadQuestions(){

    if(quiz.isEnded()){
        showScore();
    }
    else{
        let questionTextual = document.getElementById("question");
        questionTextual.innerText = quiz.getQuestionByIndex().questionText;
        let choices = quiz.getQuestionByIndex().choices;
        for(var i=1;i<=choices.length;i++)
        {
            var element ="choice"+i;
            let currentCh = document.getElementById(element);
            currentCh.innerText = choices[i-1];
            var buttlen = "btn"+i;
            let currentBtn = document.getElementById(buttlen);
            currentBtn.onclick = function(){
                quiz.checkOptionWithAnswer(choices[i-1]);
                loadQuestions();
            };
        }
        showProgress(); 
    }

}

// function  handleOption(){

// }

function showProgress(){
    var currentQuestionNumber =  quiz.questionIndex+1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question"+ currentQuestionNumber+ "of" +quiz.questions.length;

};

function showScore(){

    let quizOverHtml = "<h1>Result</h1>";
    quizOverHtml+="<h2 id='score'>Your Score: "+quiz.score+"with percentage: "+calcPercentage(quiz.score,questions.length)+"%"+"</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = quizOverHtml;
};

function calcPercentage(score,questionLength){
    return (score/questionLength)*100;
};

let questions = [
    new Question("Question1",["op1","op2","op3","op4"],"op4"),
    new Question("Question2",["op1","op2","op3","op4"],"op3"),
    new Question("Question3",["op1","op2","op3","op4"],"op2"),
    new Question("Question4",["op1","op2","op3","op4"],"op1"),
    new Question("Question5",["op1","op2","op3","op4"],"op3")
];

let quiz = new Quiz(questions);
loadQuestions();