function generateWinningNumber(){
    return Math.floor((Math.random() * 100) + 1);
}


function shuffle(array){
    
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber(); 
}


Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber;
}

Game.prototype.checkGuess = function(guessNum){
    if(guessNum === this.winningNumber){
        $('#subtitle').text('Please click the Reset button to play again!');
        $('.disable').prop("disabled",true);
        return `${this.winningNumber} was correct! \nYou Win!`;
    }else if(this.pastGuesses.indexOf(guessNum)!== -1){
        return "You have already guessed that number.";
    }else{
        this.pastGuesses.push(guessNum);
        $(`#guesses li:nth-child(${this.pastGuesses.indexOf(guessNum) + 1})`).first().text(guessNum);
        if(this.pastGuesses.length >= 5 && guessNum !== this.winningNumber){
            $('#subtitle').text('Please click the Reset button to play again!');
            $('.disable').prop("disabled",true);
            return `You Lose. \nCorrect answer was ${this.winningNumber}`;
        }
        if(this.isLower()){
            $('#subtitle').text('Guess higher!');
        }else{
            $('#subtitle').text('Guess lower!');
        }            
        if(this.difference() < 10){
            return "You\'re burning up!";
        }else if(this.difference() < 25){
            return "You\'re lukewarm.";
        }else if(this.difference() < 50){
            return "You\'re a bit chilly.";
        }else if(this.difference() < 100){
            return "You\'re ice cold!"
        }
    }
}

Game.prototype.playersGuessSubmission = function(guessNum){
    this.playersGuess = guessNum;
    if(guessNum >= 1 && guessNum <= 100 && typeof guessNum === 'number'){
        return this.checkGuess(guessNum);
    }else{
        $('#title').text("That is an invalid guess.");
        throw "That is an invalid guess.";
    }
}

function newGame(){
    return new Game();
}

Game.prototype.provideHint = function(){
    return shuffle([this.winningNumber,generateWinningNumber(),generateWinningNumber()]);
}

function guessMade(game){
    let aGuess = $('#player-input').val();
    $('#player-input').val('');
    
    
    
    $('#title').text(game.playersGuessSubmission(parseInt(aGuess)));
}



$(document).ready(function(){
    var game = new Game();
    $('#submit').click(function(){
        guessMade(game);
        
    });
    $('#player-input').keypress(function(event){
        if(event.which == 13){
            guessMade(game);
        }
        
    });
    $('#reset').click(function(){
        game = new Game();
        $('li').text('-');
        $('.disable').prop("disabled",false);
        $('#title').text('Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100');
    });
    $('#hint').click(function(){
        $('#title').text('Here\'s a hint: ' + game.provideHint());
        
    });

});