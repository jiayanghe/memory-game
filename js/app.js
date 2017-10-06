//list that hold all the cards.
let cardList = [
        {
            name: 'diamond',
            class: 'card',
            icon: 'fa fa-diamond'
        },
        {
            name: 'diamond',
            class: 'card',
            icon: 'fa fa-diamond'
        },
        {
            name: 'plane',
            class: 'card',
            icon: 'fa fa-paper-plane-o'
        },
        {
            name: 'plane',
            class: 'card',
            icon: 'fa fa-paper-plane-o'
        },
        {
            name: 'anchor',
            class: 'card',
            icon: 'fa fa-anchor'
        },
        {
            name: 'anchor',
            class: 'card',
            icon: 'fa fa-anchor'
        },
        {
            name: 'bolt',
            class: 'card',
            icon: 'fa fa-bolt'
        },
        {
            name: 'bolt',
            class: 'card',
            icon: 'fa fa-bolt'
        },
        {
            name: 'cube',
            class: 'card',
            icon: 'fa fa-cube'
        },
        {
            name: 'cube',
            class: 'card',
            icon: 'fa fa-cube'
        },
        {
            name: 'leaf',
            class: 'card',
            icon: 'fa fa-leaf'
        },
        {
            name: 'leaf',
            class: 'card',
            icon: 'fa fa-leaf'
        },
        {
            name: 'bicycle',
            class: 'card',
            icon: 'fa fa-bicycle'
        },
        {
            name: 'bicycle',
            class: 'card',
            icon: 'fa fa-bicycle'
        },
        {
            name: 'bomb',
            class: 'card',
            icon: 'fa fa-bomb'
        },
        {
            name: 'bomb',
            class: 'card',
            icon: 'fa fa-bomb'
        }];

let openList = [];
let lockList = [];
let moveCounter = 0;
let stars = 3;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//reload the page when user click restart.
$('.restart').click(function(){
    location.reload();
})
//reload the page when user hit play again.
$('.again').click(function(){
    location.reload();
})


shuffle(cardList);//shuffle the list.

//loop through each card in the list.
for (let card of cardList) {
    let addLi = document.createElement('li');
	let addI = document.createElement('i');

	addLi.classList.add(card.class, card.name);
    addI.className = card.icon;

    addLi.append(addI);
    $('.deck').append(addLi);

    //adds event listener to each card. 
    addLi.addEventListener('click', function clicker() {
        //prevent user from clicking the same card twice
        if (addLi.classList.contains('open')) {
        return false;
        }
        //add classes to the card to show the symbol
        this.classList.add('open', 'show');
        openList.push(addLi);//add the open card to openList
        moveCounter += 1; //increment move counts
        $('.moves').html(moveCounter);
        //display stars according to users moves
        if(moveCounter>25 && moveCounter<=35){
                $('#star3').css('display','none')
            }else if(moveCounter>35) {
                $('#star3').css('display','none')
                $('#star2').css('display','none')
            }

        //if two cards are open, check if they match
        if(openList.length === 2) {
            let card1 = openList[0];
            let card2 = openList[1];
            if(card1.classList.contains(card.name) && card2.classList.contains(card.name)) {
                card1.classList.add('match');
                card2.classList.add('match');
                openList.length = 0;
                lockList.push(card1,card2);

            }else{
                //set delay so user can see the second card beofre they close.
                setTimeout(function() {
                    card1.classList.remove('open', 'show');
                    card2.classList.remove('open', 'show');
                    openList.length = 0;    

                }, 600);   
 
            }
        //the game ends when all 16 cards are locked.   
        if(lockList.length === 16) {
            if(moveCounter>25 && moveCounter<=35){
                stars = 2;
            }else if(moveCounter>35) {
                stars = 1;
            }
            stopper(); 
            let winMessage = "You've won in " + timeUsed + " seconds! \n" + "You got " + stars + " stars"
            setTimeout(function(){
               $('.modal').css('display', 'inline-block'); //display the modal to show the win message.
               $('.finalscore').append(winMessage);
           }, 600);
            
            };
        };
    });
};
//set up timer to monitor how long the user used to win the game.
let timeUsed = 0;

function timer() {
    timeUsed += 1;
};

let starter = function() {
    startNow=setInterval(timer, 1000);
};
let stopper = function() {
    clearInterval(startNow);
};

//start the timer when use make the first click.
$('.deck').one('click', starter);
$('.deck').one('click', updateTimer);

function addTimer () {
     $('.timer').html(timeUsed);
};

function updateTimer() {
    setInterval(addTimer,1000)
};


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};





