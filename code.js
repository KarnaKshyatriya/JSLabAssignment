function Question(text,choices,answer)
{
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}

Question.prototype.isCorrectAnswer=function(choice_entered)
{
    return this.answer===choice_entered;
}

let ques=[
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
  new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
  new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
  new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
  new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")

];

function Quiz(ques)
{
    this.ques=ques;
    this.score=0;
    this.question_index=0;
}

Quiz.prototype.questionByIndex=function(){
    return this.ques[this.question_index];
}

Quiz.prototype.updateScore=function(answer){
let currentQuestion=this.questionByIndex();
if(currentQuestion.isCorrectAnswer(answer))
{
    this.score+=1;
}
this.question_index+=1;
}

Quiz.prototype.isQuizEnded=function(){
    return this.question_index===ques.length;
}

let obj=new Quiz(ques);

function loadQuestion()
{
    if(obj.isQuizEnded())
    {
        displayScore();
    }
    else{
        let q1=document.getElementById('question');
        q1.innerText=obj.questionByIndex().text;
        let choices=obj.questionByIndex().choices;
        for(var i=0;i<choices.length;i++)
        {
            let btn=document.getElementById('btn'+i);
            let ds=document.getElementById('choice'+i);
        ds.innerText=choices[i];
        const choice = choices[i];
            btn.onclick=()=>{

               // alert('Button Clicked');            
                obj.updateScore(choice);
                loadQuestion();
            };
            
        }
        updateProgress();
    }
    
}

function displayScore()
{
    let quiz = document.getElementById('quiz');
    let res = "<h1>Result</h1>"
    res+="<h2>" +" Your Score is: "+ obj.score + "<br>"+" Marks percentage is: " + (obj.score/ques.length*100) + "%" +"</h2>";
    quiz.innerHTML = res;


}

function updateProgress()
{
    let ele=document.getElementById('progress');
    ele.innerText="Question "+(obj.question_index+1)+" of "+(obj.ques.length);
}
loadQuestion();
