const gameModule = (function() {
    
    let gameboard = Array(9).fill(null);

    let playerTurn = true; //player goes 1st
    
    const gameGrids = document.querySelectorAll(".gameboard-grid");

    const gameContainer = document.querySelector(".gameboard-container");

    let counter = 0;

    let gameOver = false;

    

    const computerMove = function() {
        let randomNum = Math.floor((Math.random() * 9) + 1); //random num bewteen 1-9
        console.log(randomNum);
        if(gameboard[randomNum] === null) {
            gameboard.splice(randomNum, 1, "O");
            
        } 
        else if(counter >= 8){ //do nothinng after no more spaces
           return;
        }
        else{
            computerMove(); //if random num space is taken retry
        }    
    }

    const makeMove = function() {
        gameGrids.forEach(grid => 
            grid.addEventListener('click', (event) => {
                let gridNum = event.target.dataset.grid;
                console.log(gridNum);
                
                if(gameOver == true || gameOver == "tie"){ //if game has ended reset board and wait for next click
                    resetGame();
                    return;
                }
                if(gameboard[gridNum - 1] !== null) { //do nothing if spot is taken
                    return;
                }

                gameboard.splice((gridNum - 1), 1, "X");
                
                render();
                addCounter();
                checkForWin();
                checkForGameOver();
                swapTurns();
                
                if(gameOver === true){ //end game if player wins
                    return;
                }
                
                computerMove();
                render();
                
                addCounter();
                checkForWin();
                checkForGameOver();
                swapTurns();
                
                   
        }))
    }
    
    
    

    const createPlayer = function(name, type) {
        console.log(name);
        return {name, type}
    }

    const swapTurns = function() {
        playerTurn = !playerTurn;
        console.log(playerTurn);
    }
    
        //want to attach this to event listener
        //should add x or o to gameboard depending on player.type
    
    const render = function(){
        for(i=0; i<9; i++){
            gameGrids[i].textContent = gameboard[i];
        }
        console.log(gameboard);
    }
    
    const checkForGameOver = function() {
        if(gameOver == true && playerTurn == true){
            console.log('You Won!');
            
        }
        else if(gameOver == true && playerTurn == false){
            console.log('You Lost');
            
        }
        else if(gameOver == "tie"){
            console.log('You Tied');
           
        }
    }

    const resetGame = function() {
        gameboard = Array(9).fill(null);
        counter = 0;
        playerTurn = true;
        gameOver = false;
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

    const gameFlow = function() {
        gameContainer.addEventListener('click', function(){ 
                
               
            })    
       //alternate turns
        //check for 3 in row
        //if all array is full return tie
        //reset square
    }

    render(); 
    makeMove();
    

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