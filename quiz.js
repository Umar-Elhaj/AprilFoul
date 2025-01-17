const startBtn = document.querySelector('.start-button');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const ContinueBtn= document.querySelector('.continue-btn');
const quizSection= document.querySelector('.quiz-section');
const quizBox= document.querySelector('.quiz-box');
const resultBox= document.querySelector('.result-box');
const tryAgainBtn= document.querySelector('.tryAgain-btn');
const goHomeBtn= document.querySelector('.goHome-btn');
const blagues= document.querySelector('.blague');
const LastPages= document.querySelector('.LastPage');


startBtn.onclick = () => {
 
    popupInfo.classList.add('active');
    main.classList.add('active');

}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

ContinueBtn.onclick = () => {
    
    quizSection.classList.add('active');

    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');


    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
   /* quizSection.classList.add('active');*/

    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    LastPages.classList.add('active');
    blagues.classList.add('active');
    
    main.classList.add('active');
    


    
  //  quizBox.classList.add('active');
   // nextBtn.classList.remove('active');
   // resultBox.classList.remove('active');
    
   /* questionCount =0;
    questionNumb =1;
    UserScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();*/
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    
    questionCount =0;
    questionNumb =1;
    UserScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
}

let questionCount =0;
let questionNumb =1;
let UserScore = 0;

const nextBtn = document.querySelector('.next-btn');

const optionList = document.querySelector('.option-list');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);
       
        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');

    }
    else{
        showResultBox();
        //console.log('Question Completed');
    }

}

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                     <div class="option"><span>${questions[index].options[1]}</span></div>
                    <div class="option"><span>${questions[index].options[2]}</span></div>
                    <div class="option"><span>${questions[index].options[3]}</span></div>`;
    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i = 0 ; i<option.length ; i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let AllOptions= optionList.children.length; 

    if (userAnswer == correctAnswer){
        answer.classList.add('correct');
        UserScore =UserScore+1;
        headerScore();
       // console.log('answer is correct');
    }else{
       // console.log('answer is wrong');
       answer.classList.add('incorrect');
    }

    //if option is incorrect auto Select correct

    for (let i = 0 ; i < AllOptions ; i++){
        if(  optionList.children[i].textContent == correctAnswer){
            optionList.children[i].setAttribute('class','option correct');
        }
        
    }  

    for (let i = 0 ; i < AllOptions ; i++){
        optionList.children[i].classList.add('disabled');
    }
    
    nextBtn.classList.add('active');

}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} sur ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent= `Score : ${UserScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${UserScore} out of ${questions.length}`;
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (UserScore / questions.length) * 100;
    let speed= 20;

    let progress = setInterval(() => {
        progressStartValue++;
        console.log(progressStartValue);


        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    }, speed);
}

