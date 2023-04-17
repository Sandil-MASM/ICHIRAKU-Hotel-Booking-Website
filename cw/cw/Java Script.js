//creating an array of questions
const questionnaire = [
    {
        question: "01). What is the longest waterfall in Sri Lanka?" ,
        correctAns: "c",
        options :[
            "Diyaluma Ella Falls",
            "Lakshapana Ella Falls",
            "Bambarakanda Ella Falls",
            "Aberdeen Falls"
        ]
    },{
        question: "02). The famous Nine Arches Brdge is located in;" ,
        correctAns: "b",
        options :[
            "Hatton",
            "Ella",
            "Kandy",
            "Nuwara Eliya"
        ]
    },{
        question: "03). What is the best National Park for bird watching in Sri Lanka bordering the eastern coast of the island?" ,
        correctAns: "c",
        options :[
            "Udawalawa National Park",
            "Yala National Park",
            "Kumana National Park",
            "Wilpattu National Park"
        ]
    },{
        question: "04). Which one of these beaches is famous for its surfing points in Sri Lanka that attract surfers from all over the world?" ,
        correctAns: "b",
        options :[
            "Nilaveli Beach",
            "Arugam Bay",
            "Marble Beach",
            "Kalkudah Beach"
        ]
    },{
        question: "05). While Mirissa and Trincomalee are known to be the best for whale watching in Sri Lanka, which time of the year is your best chance to spot Blue Whales in the South?" ,
        correctAns: "a",
        options :[
            "December to April",
            "October to January",
            "March to July",
            "June to September"
        ]
    },{
        question: "06). Who was the king that built Sigiriya Rock fortress?" ,
        correctAns: "d",
        options :[
            "King Pandukabhaya",
            "King Ravana",
            "King Dhatusena",
            "King Kashyapa"
        ]
    },{
        question: "07). The American nature documentary ‘Monkey Kingdom’ is about a family of monkeys living in the ancient ruins founded in the jungle of?" ,
        correctAns: "a",
        options :[
            "Polonnaruwa",
            "Dambulla",
            "Anuradhapura",
            "Kandy"
        ]
    },{
        question: "08). What is the Hindu temple that located on the top of Swami Rock in Trincomalee with the mesmerising wide view of the ocean?",
        correctAns: "a",
        options :[
            "Koneswaram Temple",
            "Sri Kaileswaram Kovil",
            "Shri Bhakta Hanuman Temple",
            "Mari Amma kovil"
        ]
    },{
        question: "09). Sri Lanka's Rose Quartz mountain range is the largest of its kind in South Asia.It is located in?",
        correctAns: "c",
        options :[
            "Anuradhapura",
            "Habarana",
            "Dambulla",
            "Polonnaruwa"
        ]
    },{
        question: "10). What is the widest waterfall in Sri Lanka?",
        correctAns: "d",
        options :[
            "Bomburu Ella",            
            "Ravana Ella",
            "Diyaluma Falls",
            "Bakers Falls"            
        ]
    }
];	

//declaring variables
var rulesBox = document.getElementById('rulesContainer');
var quiz = document.getElementById('quizContainer');
var timeCount = document.getElementById('timer');
var question = document.getElementById("question");
var answer1 = document.getElementById("ans1");
var answer2 = document.getElementById('ans2');
var answer3 = document.getElementById('ans3');
var answer4 = document.getElementById('ans4');
var answer = document.getElementsByName("answer");
var nextQues = document.getElementById('nextQ');
var summary = document.getElementById('fixedResults');
var timesUp = document.getElementById("timesUp");
var timeSpent = document.getElementById("timeSpent");
var result = document.getElementById("result");
var score = document.getElementById("score");
var resultSummary = document.getElementById("resultSummary");
var performanceContainer = document.getElementById("performanceContainer");
var navigationBarContainer = document.getElementById("navigationBarContainer");
var fixedResultsContainer = document.getElementsByClassName('fixedResultsContainer'); 

var quesCount = 0;
var totalQuestions = questionnaire.length;
var userScore = 0;
var correctAnswerCount = 0;
var timer;
var sec = 60;
var correctAnswer;
var userAns;
var performanceArr = [];
var a;

//when start button clicked
function startButtonClicked(){
    console.log(new Date + 'here');
    rulesBox.style.display = "none";//hide rules
    summary.style.display = "none";//hide summary
    document.getElementById('div1').style.display = 'none';
    quiz.style.display = "block";//show the quiz
    setTimer(); //setting up the timer
    showQuestion(0); //displaying questions
    console.log(new Date + 'end');     
};

//getting questions and options from arraay
function showQuestion(Index){
    timeCount.innerHTML = 'Time Left: ' + sec + ' seconds';
    //unchecking the all the options
    document.getElementById('aa').checked = false;
    document.getElementById('ab').checked = false;
    document.getElementById('ac').checked = false;
    document.getElementById('ad').checked = false;
    //getting the question and the relevent options from the array
    question.innerHTML = questionnaire[Index].question;
    answer1.innerHTML = questionnaire[Index].options[0];
    answer2.innerHTML = questionnaire[Index].options[1];
    answer3.innerHTML = questionnaire[Index].options[2];
    answer4.innerHTML = questionnaire[Index].options[3];
    quesCount++; //increasing the question count
    if (quesCount== totalQuestions){
        nextQues.innerHTML = "Submit"; //changing next question button into submit button
    }
};

//when next question button clicked
function nextQuestion(){
    //declaring the radio array
    var radioArray = [
        document.getElementById('aa'),
        document.getElementById('ab'),
        document.getElementById('ac'),
        document.getElementById('ad')
    ]
    //getting the text content of selected options
    if(radioArray[0].checked){
        a = answer1.textContent;
        console.log(a);
    }else if(radioArray[1].checked){
        a = answer2.textContent;
        console.log(a);
    }else if(radioArray[2].checked){
        a = answer3.textContent;
        console.log(a);
    }else if(radioArray[3].checked){
        a = answer4.textContent;
        console.log(a);
    }
    optionSelected(radioArray);
}

//getting the selected option by the user 
function getRadioValue(radioArray){
    var i;
    for (i=0;i<radioArray.length;i++){
        if(radioArray[i].checked){
            return radioArray[i].value;
        }
    }
    return "";
}

function optionSelected(radioArray){
    userAns = getRadioValue(radioArray);
    console.log(userAns); 
    //error handling   
    if (!userAns){
        alert('Please select an answer to continue');
        return;
    } 
    console.log(quesCount);
    correctAnswer = questionnaire[quesCount-1].correctAns;
    var performanceQ ="";
    performanceQ = '<br><div id=' + (quesCount-1) + '><span class="question">' + questionnaire[quesCount-1].question +'</span></div><br>';//creating div tag for the performance summary
    console.log(performanceQ);
    performanceArr.push(performanceQ);
    if (userAns == correctAnswer){
        userScore += 2;
        correctAnswerCount++;
        console.log(quesCount);
        if (a==questionnaire[quesCount-1].options[0]){
            performanceA = '<div><span class="correct">' + questionnaire[quesCount-1].options[0] + '&#x2714;' + '</span><br>'//creating div tag for the performance summary
            +'<span class="options">' + questionnaire[quesCount-1].options[1] + '</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[2] + '</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[3] + '</span></div><br>';
        }else if (a==questionnaire[quesCount-1].options[1]){
            performanceA = '<div><span class="options">' + questionnaire[quesCount-1].options[0] + '</span><br>'//creating div tag for the performance summary
            +'<span class="correct">' + questionnaire[quesCount-1].options[1] + '&#x2714;' +'</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[2] + '</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[3] + '</span></div><br>';
        }else if (a==questionnaire[quesCount-1].options[2]){
            performanceA = '<div><span class="options">' + questionnaire[quesCount-1].options[0] + '</span><br>'//creating div tag for the performance summary
            +'<span class="options">' + questionnaire[quesCount-1].options[1] + '</span><br>'
            +'<span class="correct">' + questionnaire[quesCount-1].options[2] + '&#x2714;' + '</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[3] + '</span></div><br>';
        }else if (a==questionnaire[quesCount-1].options[3]){
            performanceA = '<div><span class="options">' + questionnaire[quesCount-1].options[0] + '</span><br>'//creating div tag for the performance summary
            +'<span class="options">' + questionnaire[quesCount-1].options[1] + '</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[2] + '</span><br>'
            +'<span class="correct">' + questionnaire[quesCount-1].options[3] + '&#x2714;' + '</span></div><br>'           
        }performanceArr.push(performanceA);
    }else{
        userScore += -1;
        if (a==questionnaire[quesCount-1].options[0]){
            performanceA = '<div><span class="wrong">' + questionnaire[quesCount-1].options[0] + '&#x2718;' + '</span><br>'//creating div tag for the performance summary'
            +'<span class="options">' + questionnaire[quesCount-1].options[1] + '</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[2] + '</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[3] + '</span></div><br>';
        }else if (a==questionnaire[quesCount-1].options[1]){
            performanceA = '<div><span class="options">' + questionnaire[quesCount-1].options[0] + '</span><br>'//creating div tag for the performance summary
            +'<span class="wrong">' + questionnaire[quesCount-1].options[1] + '&#x2718;' +'</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[2] + '</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[3] + '</span></div><br>';
        }else if (a==questionnaire[quesCount-1].options[2]){
            performanceA = '<div><span class="options">' + questionnaire[quesCount-1].options[0] + '</span><br>'//creating div tag for the performance summary
            +'<span class="options">' + questionnaire[quesCount-1].options[1] + '</span><br>'
            +'<span class="wrong">' + questionnaire[quesCount-1].options[2] + '&#x2718;' + '</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[3] + '</span></div><br>';
        }else if (a==questionnaire[quesCount-1].options[3]){
            performanceA = '<div><span class="options">' + questionnaire[quesCount-1].options[0] + '</span><br>'//creating div tag for the performance summary
            +'<span class="options">' + questionnaire[quesCount-1].options[1] + '</span><br>'
            +'<span class="options">' + questionnaire[quesCount-1].options[2] + '</span><br>'
            +'<span class="wrong">' + questionnaire[quesCount-1].options[3] + '&#x2718;' + '</span></div><br>';
        }performanceArr.push(performanceA);
    };

    if(quesCount==totalQuestions){
        //change background color according to the user score when answers the all the questions
        if(userScore<0){
            userScore=0;
            document.getElementById('div1').style.backgroundColor = "#ffb3b3";
            for(var i = 0; i < fixedResultsContainer.length; i++){
                fixedResultsContainer[i].style.backgroundColor = "#ffb3b3";
                }           
        }else if(userScore<5){
            document.getElementById('div1').style.backgroundColor = "#ffbf91"; 
            for(var i = 0; i < fixedResultsContainer.length; i++){
                fixedResultsContainer[i].style.backgroundColor = "#ffbf91";
                }              
        }
        else if(userScore<8){
            document.getElementById('div1').style.backgroundColor = "#d2d959";
            for(var i = 0; i < fixedResultsContainer.length; i++){
                fixedResultsContainer[i].style.backgroundColor = "#d2d959";
                }             
        }
        else{
            document.getElementById('div1').style.backgroundColor = "#95f294";
            for(var i = 0; i < fixedResultsContainer.length; i++){
                fixedResultsContainer[i].style.backgroundColor = "#95f294";
                }            
        }
        //final result
        var spendTime = 60 - sec;
        clearInterval(timer);
        document.getElementById('inner').style.display = "none";
        summary.style.display = "block";
        timeSpent.innerHTML = "You completed quiz in " + spendTime + " seconds.";
        result.innerHTML = "You have got " + correctAnswerCount + "/10 correct.";
        score.innerHTML = "Your score: " + userScore;

    };
    showQuestion(quesCount);
}

function summaryOfResults(){       
    document.getElementById('div1').style.display = 'block';
    navigationBarContainer.style.display = 'block'; 
    performanceContainer.style.display = 'block';
    resultSummary.innerHTML = performanceArr.join('');

}

//setting the timer
function setTimer(){
    timer = setInterval(counter,1000);
    function counter(){
        timeCount.innerHTML = 'Time Left: ' + sec + ' seconds';
        sec--;
        //when given time is over
        if (sec<0){
            clearInterval(timer);
            quiz.style.display = "none";//hides quiz
            document.getElementById('inner').style.display = "none";
            summary.style.display = "block";//displays summary
            timesUp.innerHTML = "Time Out";
            result.innerHTML = "You have got " + correctAnswerCount + "/10 correct.";
            if(userScore<0){
                userScore=0;
                //changing the background color according to the user score
                document.getElementById('div1').style.backgroundColor = "#ffb3b3";
                for(var i = 0; i < fixedResultsContainer.length; i++){
                    fixedResultsContainer[i].style.backgroundColor = "#ffb3b3";
                    }            
            }else if(userScore<5){
                document.getElementById('div1').style.backgroundColor = "#ffbf91";
                for(var i = 0; i < fixedResultsContainer.length; i++){
                    fixedResultsContainer[i].style.backgroundColor = "#ffbf91";
                    }   
            }
            else if(userScore<8){
                document.getElementById('div1').style.backgroundColor = "#d2d959";
                for(var i = 0; i < fixedResultsContainer.length; i++){
                    fixedResultsContainer[i].style.backgroundColor = "#d2d959";
                    }  
            }
            else{
                document.getElementById('div1').style.backgroundColor = "#bbffba";
                for(var i = 0; i < fixedResultsContainer.length; i++){
                    fixedResultsContainer[i].style.backgroundColor = "#95f294";
                    }    
            }
            //displaying the rest of the questions
            for(var i=quesCount; i<questionnaire.length; i++){
                performanceQ = '<br><div id=' + i + '><span class="question">' + questionnaire[i].question +'</span></div><br>';
                performanceArr.push(performanceQ);
                performanceA = '<div><span class="options">' + questionnaire[i].options[0] + '</span><br>'
                +'<span class="options">' + questionnaire[i].options[1] + '</span><br>'
                +'<span class="options">' + questionnaire[i].options[2] + '</span><br>'
                +'<span class="options">' + questionnaire[i].options[3] + '</span></div><br>';
                performanceArr.push(performanceA);
            }
            score.innerHTML = "Your score: " + userScore;

        }
    }return;
}