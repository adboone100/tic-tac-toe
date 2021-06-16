const gameModule = (function() {
    
    let gameboard = Array(9).fill(null);
    let playerTurn = true; //player goes 1st
    let counter = 0; //goes up to 8 (for each square)
    let gameOver = false;
    
    const gameGrids = document.querySelectorAll(".gameboard-grid");
    const winnerMessage = document.querySelector(".winner");
    const turnMessage = document.querySelector(".turn");

    const computerMove = function() {
        let randomNum = Math.floor(Math.random() * 9); //random num bewteen 1-9
        if(gameboard[randomNum] === null) {
            gameboard.splice(randomNum, 1, "O");
        }
        else if(counter > 8){ //do nothinng after no more spaces
           return;
        }
        else{
            computerMove(); //if random num space is taken retry
        }    
    }
    console.log(Math.floor(Math.random()));
    const flipCoin = function(){
        const flipCoinOutcome = Math.floor(Math.random() * 2); //random num 0-1
        if (flipCoinOutcome == 0) {
            playerTurn = true;
            console.log("won toss");
        }
        else if (flipCoinOutcome == 1){
            playerTurn = false;
            console.log("lost toss");
        }
    }
    
    const gamePlay = function(event) {
        let gridNum = event.target.dataset.grid;
        if(gameOver == true || gameOver == "tie"){ //if game has ended reset board and wait for next click
            resetGame();
            return;
        }

        if(gameboard[gridNum - 1] !== null) { //do nothing if spot is taken
            return;
        }
        if(counter == 0){
            flipCoin();
        }

        if(playerTurn == true){

            gameboard.splice((gridNum - 1), 1, "X");
                    
            render();
            removeTurnMessage();
            addCounter();
            checkForWin();
            checkForGameOver();
            swapTurns();
        }

        if(gameOver === true){ //end game if player wins
            return;
        }
        
        if(playerTurn == false){
            console.log(playerTurn);
            computerMove();
            render();
            addCounter();
            checkForWin();
            checkForGameOver();
            swapTurns();
        }         
    }

    const makeMove = (function() {
        gameGrids.forEach(grid => 
            grid.addEventListener('click', gamePlay))
    })();

    const removeTurnMessage = function() {
        turnMessage.textContent = "";
    } 

    const createPlayer = function(name, type) {
        console.log(name);
        return {name, type}
    }

    const swapTurns = function() {
        playerTurn = !playerTurn;
    }
    
    const render = function(){
        for(i=0; i<9; i++){
            gameGrids[i].textContent = gameboard[i];
        }
    }
    
    const checkForGameOver = function() {
        if(gameOver == true && playerTurn == true){
            winnerMessage.textContent = "YOU WON!!"  
        }
        else if(gameOver == true && playerTurn == false){
            winnerMessage.textContent = "YOU LOST!!";   
        }
        else if(gameOver == "tie"){
            winnerMessage.textContent = "You tied...";
        }
    }

    const resetGame = function() {
        gameboard = Array(9).fill(null);
        counter = 0;
        playerTurn = true;
        gameOver = false;
        winnerMessage.textContent = "";
        turnMessage.textContent = "You go first!"
        render();
    }
    
    const addCounter = function(){
        counter++;
    }

    const checkForWin = function() {
        if (gameboard[0] !== null && gameboard[0] == gameboard[1] && gameboard[1] == gameboard[2]){
            gameOver = true;
        }
        else if (gameboard[3] !== null && gameboard[3] == gameboard[4] && gameboard[4] == gameboard[5]){
            gameOver = true;
        }
        else if (gameboard[6] !== null && gameboard[6] == gameboard[7] && gameboard[7] == gameboard[8]){
            gameOver = true;
        }
        else if (gameboard[0] !== null && gameboard[0] == gameboard[3] && gameboard[3] == gameboard[6]){
            gameOver = true;
        }
        else if (gameboard[1] !== null && gameboard[1] == gameboard[4] && gameboard[4] == gameboard[7]){
            gameOver = true;
        }
        else if (gameboard[2] !== null && gameboard[2] == gameboard[5] && gameboard[5] == gameboard[8]){
            gameOver = true;
        }
        else if (gameboard[0] !== null && gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8]){
            gameOver = true;
        }
        else if (gameboard[2] !== null && gameboard[2] == gameboard[4] && gameboard[4] == gameboard[6]){
            gameOver = true;
        }
        else if (gameboard.every((grid) => grid !== null)){
            gameOver = "tie";
        }    
    }

    render(); //initial render
    
    

    return {
        createPlayer: createPlayer,
    }
    
})();







const adam = gameModule.createPlayer("Adam", "x");
console.log(adam.type)


//first create empty gameboard array (9 spaces)

//start array with null as the vale for each array value ie. 1:null 2:null

//what functions will i need
// function to make a move (based on whose turn it is and where player clicks or comp randomly selects)
// function to check for win (ie 3 of one type in a row)
// function check if all squares are fill for tie
// function to pass turn to next player
// function to reset game
// function for computer random selection logic
// function update display for array addition of either player
// function to create players


// gameboard as an array

// each array space correlates to blank space on