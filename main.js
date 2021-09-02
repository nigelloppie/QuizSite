const question_text = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submitBtn");
let currentQuiz = 0;
let Score = 0;
let answer = undefined;


connectAPI();


function setQuizInfo(quizQuestions){
    const currentQuestion = quizQuestions.results[currentQuiz];
    question_text.innerHTML = currentQuestion.question;
    let answers = [];
    currentQuestion.incorrect_answers.forEach(element => {
        answers.push(element);
    });
    answers.push(currentQuestion.correct_answer);
    
    var mixed = [].concat(answers);
    mixed.sort(function(){
        return 0.5 - Math.random();
    });

    a_text.innerHTML = mixed[0];
    b_text.innerHTML = mixed[1];
    c_text.innerHTML = mixed[2];
    d_text.innerHTML = mixed[3];
    currentQuiz++;
}

function connectAPI(){
    fetch('https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple')
    .then(function(response){
        return response.json();
    }).then(function(json){

        setQuizInfo(json);
        
        submitBtn.addEventListener("click", () => {

            checkSelected();

            let selectedAnswer = document.getElementById(answer+"_text").innerHTML;
            document.getElementById("a").checked = false;
            document.getElementById("b").checked = false;
            document.getElementById("c").checked = false;
            document.getElementById("d").checked = false;
            if(selectedAnswer && selectedAnswer === json.results[currentQuiz-1].correct_answer){
                Score++;
            }
            
            if(currentQuiz < 10) {
                setQuizInfo(json);
            }
            else{
                alert("Your Final Score is " + Score + "/10");
            }
        });
    });
}

function checkSelected(){
    const radioValues = document.querySelectorAll(".option");
    radioValues.forEach((answerEl) => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
    return undefined;
}