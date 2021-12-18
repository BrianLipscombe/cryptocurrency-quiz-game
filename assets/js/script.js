/*jshint esversion: 6 */

// Portions of code borrowed from Youtube video "Create a Quiz App with Timer using HTML CSS & JavaScript | Quiz Web App using JavaScript" parts 1 & 2 on the Youtube channel CodingNepal at https://www.youtube.com/watch?v=pQr4O1OITJo&t=1324s as well as from Github repository https://github.com/HeleJ/quiz-game-about-Estonia as documented in this project's README

// Selecting required elements

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// If the StartQuiz Button is clicked

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // Show the info box
};

// If the ExitQuiz button is clicked

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // Hide the info box
};

// If the continueQuiz button is clicked

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // Hide the info box
    quiz_box.classList.add("activeQuiz"); // Show the quiz box
    showQuestions(0); // Calling showQuestions function
    queCounter(1); // Passing 1 parameter to queCounter
    startTimer(30); // Calling startTimer function
    startTimerLine(0); // Calling startTimerLine function
};

let timeValue = 30;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// If the restartQuiz button is clicked

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); // Show quiz box
    result_box.classList.remove("activeResult"); // Hide the result box
    timeValue = 30;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); // Calling showQestions function
    queCounter(que_numb); // Passing que_numb value to the queCounter
    clearInterval(counter); // Clear counter
    clearInterval(counterLine); // Clear counterLine
    startTimer(timeValue);  // Calling startTimer function
    startTimerLine(widthValue);  // Calling startTimeLine function
    timeText.textContent = "TIME:";  
    next_btn.classList.remove("show");  // Hide the next button
};

// If the quitQuiz button is clicked

quit_quiz.onclick = ()=>{
    window.location.reload();
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// If the Click Next button is clicked

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "TIME:";
        next_btn.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
};

// If getting questions and options from array

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb+ "." + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                      + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                      + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                      + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// Div tags for icons

let tickIconTag = '<div class="icon tick"><i class="fas fa-chart-line"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-chart-line fa-flip-vertical"></i></div>';

// If the user clicked on option

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    const allOptions = option_list.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");  // Adding green color to correctly selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); // adding tick icon
    }else{  // Incorrect answer
        answer.classList.add("incorrect");  // Addng red color to incorrectly selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cress icon

        // If answer is incorrect then automatically selected the correct answer
        for(i=0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
            }
        }
    }

    // Once user selected disabled all options

    for (i=0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
    
} 

// Function showResult
function showResult(){
    info_box.classList.remove("activeInfo");  // Hide the info box
    quiz_box.classList.remove("activeQuiz");  // Hide the quiz box
    result_box.classList.add("activeResult");  // Show the result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 5){  // If user scored more than 5 right answers
        let scoreTag = '<p>PARABOLIC ACTION TO THE MOON!!! You got <span>'+ userScore +'</span> out of <span>'+ questions.length +'</span></p>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){  // If user got more than 1 right answers
        let scoreTag = '<p>Buy low and sell high, not the other way around! You only got <span>'+ userScore +'</span> out of <span>'+ questions.length +'</span></p>';
        scoreText.innerHTML = scoreTag;
    }
    else{  // if user scored less than 1 right asnwer
        let scoreTag ='<p>YOU HAVE BEEN FORCEFULLY LIQUIDATED!!! <span>'+ userScore +'</span> out of <span>'+ questions.length +'</span></p>';
        scoreText.innerHTML = scoreTag;
    }
}

//Timer

function startTimer(time){
    timeCount.textContent = time;
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time --; //decrement the time value
        if(time <9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeText.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            const allOptions = option_list.children.length;

            for (i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

// timerLine

function startTimerLine(time){
    counterLine = setInterval(timer, 310);
    function timer(){
        time += 1;
        time_line.style.width = time + `%`;
        if(time > 99){
            clearInterval(counterLine);
        }
    }
}

// creating a new span tag and passing the question number and total question

function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQueCountTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCountTag; //adding new span tag inside the bottom_ques_counter
}