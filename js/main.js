
var tl = gsap.timeline();

tl.from(".game_container", {
    y: 100,
    scale: 0.3,
    opacity: 0.2
})

tl.from(".bubbles", {
    stagger: 0.1,
    opacity: 0
})


const Game = {
    currentStep: 0,
    lives: 3,

}


var bubbles = document.querySelectorAll('.bubbles');
var bubblesLength = bubbles.length;
var maxStep = document.querySelector('.forwardSteps');
var maxStepNbr = Number.parseInt(maxStep.innerHTML);
var currentStep = document.querySelector('.currentStep');
var nbrOfLife = document.querySelectorAll('.game_life');
var tagArray = nbrOfLife.length -1;
var actualStep = Number.parseInt(currentStep.innerHTML);
var horseImg = document.querySelector('.horse_finder__img');
var nbrOfValideHorses = 6;


function randomBubbles(){
    var bubblesImg = document.querySelectorAll('.bubbles_img');
    var bubblesImgLength = bubblesImg.length;

    var randNums = [];
    var randomNbr = Math.floor(Math.random() * 6 +1);

    // bubblesImg.forEach((bubble, i) => {

    // })

    // Randomise Img
    for( var i=0 ; i<bubblesImgLength ; i++ ){
        var randomNbr = Math.floor(Math.random() * 6 +1);

        do{
            var randomNbr = Math.floor(Math.random() * 6 +1);
        }while( randNums.includes(randomNbr) )

        if( randNums.includes(randomNbr) ){
            randomNbr = Math.floor(Math.random() * 6 +1);
        }else{
            randNums[i] = randomNbr;
        }

        bubblesImg[i].src = 'answers/0' + randNums[i]  + '.png';
    }
    
}

// Update Life
function updateLife(reponse){
    var rep = reponse;

    if( reponse === false && tagArray > 0){
        nbrOfLife[tagArray].style.opacity = 0.2;
        tagArray--;    
    }else{
        alert('Looser !');
    }
}

// Update Steps
function updateStep(){
    if( actualStep < maxStepNbr ){
        actualStep++;
        currentStep.innerHTML = actualStep;
    }else{
        alert('End of Game');
    }
}

// Update Img
function updateImg(){
    var randomHorseNbr = Math.floor(Math.random() * maxStepNbr ) +1 ;
    if( randomHorseNbr >= maxStepNbr ){
        horseImg.src = 'horses/01.png';
    }else{
        horseImg.src = 'horses/0' + randomHorseNbr + '.png';
        document.querySelector('.body_game').style.backgroundImage = 'url("../../backgrounds/0' + randomHorseNbr + '.jpg")';
    }
}

// Check Answer
function answerCheck(reponse){
    var currentHorse = document.querySelector('.horse_finder__img').src;
    var currentHorseArray = currentHorse.split("/");
    var currentHorseNbr = Number.parseInt(currentHorseArray[currentHorseArray.length-1]);

    if( reponse != currentHorseNbr ){
        updateLife(false);
    }
}

for( var i=0 ;  i<bubblesLength ; i++ ){
    bubbles[i].addEventListener('click', function(){

        var answerImg = this.querySelector('img').src;
        var repArray = answerImg.split("/");
        var numberRep = Number.parseInt(repArray[repArray.length-1]);

        // Réponse check
        answerCheck(numberRep);
        updateStep();
        updateImg();
        randomBubbles();
    });
}

