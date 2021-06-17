const gameModule = (function() {
    
    let gameboard = Array(9).fill(null);
    let playerTurn = true; //player goes 1st
    let counter = 0; //goes up to 8 (for each square)
    let gameOver = false;
    let coinFlip = false;
    
    const gameGrids = document.querySelectorAll(".gameboard-grid");
    const winnerMessage = document.querySelector(".winner");
    const turnMessage = document.querySelector(".turn");
    const coinButton = document.querySelector(".coin-flip");

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
    
    const flipCoin = function(event){
        event.preventDefault();
        if(gameOver == true || gameOver == "tie"){ //if game has ended reset board and wait for next click
            resetGame();
            return;
        }
        if(coinFlip) return; //do nothing if coin has already been flipped
        coinFlip = true;
        const flipCoinOutcome = Math.floor(Math.random() * 2); //random num 0-1
        if (flipCoinOutcome == 0) {
            playerTurn = true;
            turnMessage.textContent = "You play first!"
        }
        else if (flipCoinOutcome == 1){
            playerTurn = false;
            turnMessage.textContent = "You play second!"
        }
    }
    
    const gamePlay = function(event) {
        let gridNum = event.target.dataset.grid;

        if(!coinFlip) return; //if coin is not flipped do nothing

        if(gameOver == true || gameOver == "tie"){ //if game has ended reset board and wait for next click
            resetGame();
            return;
        }
        if(gameboard[gridNum - 1] !== null) { //do nothing if spot is taken
            return;
        }
        if(playerTurn == true){
            gameboard.splice((gridNum - 1), 1, "X");
                    
            render();
            addCounter();
            checkForWin();
            checkForGameOver();
            swapTurns();
        }
        if(gameOver === true){ //end game if player wins
            return;
        }
        if(playerTurn == false){
            computerMove();
            render();
            addCounter();
            checkForWin();
            checkForGameOver();
            swapTurns();
        }         
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
            winnerMessage.textContent = "YOU WON!!";
            turnMessage.textContent = "Click the Grid to play again!"; 
        }
        else if(gameOver == true && playerTurn == false){
            winnerMessage.textContent = "YOU LOST!!";   
            turnMessage.textContent = "Click the Grid to play again!";
        }
        else if(gameOver == "tie"){
            winnerMessage.textContent = "You tied...";
            turnMessage.textContent = "Click the Grid to play again!";
        }
    }

    const resetGame = function() {
        gameboard = Array(9).fill(null);
        counter = 0;
        playerTurn = true;
        gameOver = false;
        flipCoinOutcome = "";
        coinFlip = false;
        winnerMessage.textContent = "";
        turnMessage.textContent = "Flip Coin for First Move!"
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
    
    //add listeners

    coinButton.addEventListener('click', flipCoin);

    const makeMove = (function() {
        gameGrids.forEach(grid => 
            grid.addEventListener('click', gamePlay))
    })();
    
})();