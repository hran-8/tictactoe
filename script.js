// this is the game module. It runs itself when the program starts.
const Game = (function () {
// i need to make a gameboard. I don't need a function for this.
    const gameboard = [['#', '#', '#'],
                       ['#', '#', '#'],
                       ['#', '#', '#']]; 



    // I need to make players. I should make a function called createPlayer that returns an object, well, a player. I can use it to make my two players. 
    // It needs the name and marker of the player.
    const createPlayer = function (name, marker) {
        return {name, marker}
    }

    // Let's make our players. 
    const playerOne = createPlayer("Heyran", "O");
    const playerTwo = createPlayer("Arrang", "X");

    // this whole block of code just displays the gameboard. 
    // Let's turn it into a function. 
    // Takes no arguments, displays to console, returns no arguments
    const displayGameboard = function () {
        console.log("    1  2  3\n");
        const abc = ['a', 'b', 'c'];
        for (let i = 0; i < gameboard.length; i++) {
            console.log(`${abc[i]}   ${gameboard[i].join('  ')}`);
        }

    };

    // Get the position. Requires no argument. Returns object with rowChosen, colChosen.
    const getPosition = function () {
        // Now i need to ask what position they want to place the marker and store it in a variable.
        let position = prompt("Please enter the position.");

        // Now we need to place the marker for playerOne at that position.
        // There is a problem. There is no way I can identify which position in my gameboard is "1a". So we need to somehow map each position ID with the positions on the gameboard. 
        // How about we split the string into an array, and map the first number to the row position in the array. 
        // We map the second number to column number. But the second 'number' is a letter... So we need to change the letters to numbers. 
        positionArray = position.split('');
        
        // change letters to numbers
        if (positionArray[1] === 'a') {
            positionArray[1] = 0;
        }
        else if (positionArray[1] === 'b') {
            positionArray[1] = 1; 
        }
        else {
            positionArray[1] = 2;
        }

        // change the first string to number
        positionArray[0] = parseInt(positionArray) - 1;
        // rearrange the position array so that it's in row, col format
        positionArray.reverse();

        // Now we need to populate the gameboard's position according to the user's selection.
        // lets make some variabales to easily understand the position.
        let rowChosen = positionArray[0];
        let colChosen = positionArray[1]; 

        return {rowChosen, colChosen}

    };


    // before we start the while loop, we need a variable that will check who's turn it is. Let's just use playerOne as an anchor. 
    let isPlayerOneTurn = true;

    // How about we just create a new variable currentPlayer, which returns a reference to the current player object
    let getCurrentPlayer = function () {
        if (isPlayerOneTurn === true) {
            return playerOne;
        }
        else {
            return playerTwo;
        }
        
    }





    // displays current turn
    const displayTurn = function (currentPlayer) {
        alert(`It is ${currentPlayer.name}'s turn\n`);
    }

    // function that marks gameboard, requires current player and returns nothing.
    const markGameboard = function (currentPlayer, rowChosen, colChosen) {
        gameboard[rowChosen][colChosen] = currentPlayer.marker;
    }

    // change the player turn based on the value of isPlayerOneTurn. returns nothing.
    const changePlayerTurn = function () {
        if (isPlayerOneTurn) {
            isPlayerOneTurn = false;
        }
        else {
            isPlayerOneTurn = true;
        }

    }

    // Return the winner object if winner, if not then return false
    // first for each row in the gameboard, if the rows compressed is like one marker, then it means winner.
    const isWinner = function (currentPlayer=false) {
        // Check for row winnings
        for (let row of gameboard) {
            if (row.join('') === currentPlayer.marker.repeat(3)) {
                return currentPlayer; // Exit the function and return the winner
            }
        }
        // check for col winnings 
        for (let i = 0; i < 3; i++) {
            let firstCell = gameboard[0][i]; 
            if (firstCell !== '#' && gameboard[1][i] === firstCell && gameboard[2][i] === firstCell && firstCell === currentPlayer.marker) {
                return currentPlayer;
            }
        }

        // diagonal winnings
        if (gameboard[0][0] !== '#' && gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2] && gameboard[0][0] === currentPlayer.marker) {
            return currentPlayer;
        }
        else if (gameboard[0][2] !== '#' && gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0] && gameboard[0][2] === currentPlayer.marker) {
            return currentPlayer;
        }



        return false;
    }
    
    // turn count
    let counter = 0;

    // need to create a while loop that will keep the game running as long as there is no winner. 
    while (counter < 9) {
        // clear console and display board
        console.clear();
        displayGameboard();

        // set the current player.
        let currentPlayer = getCurrentPlayer();

        // I should display to the players who's turn it is. 
        displayTurn(currentPlayer);

        // ask for position and store in row and col var
        let {rowChosen, colChosen} = getPosition();

        // mark the gameboard
        markGameboard(currentPlayer, rowChosen, colChosen);

        // Check for a winner
        let winner = isWinner(currentPlayer);
        if (winner) {
            console.clear();
            displayGameboard();
            alert(`${winner.name} wins!`);
            break; // End the game
        }

        // after marking the gameboard, change the player
        changePlayerTurn();

        counter ++;

    }

    if (counter === 9) {
        // game is tie
        console.clear();
        displayGameboard();
        alert(`Game is a tie!\n`);

    }



})();