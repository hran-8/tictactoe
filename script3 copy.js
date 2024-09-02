function Gameboard () {
    let rows = 3;
    let cols = 3;
    let board = []; 

    for (let i = 0; i < rows; i++) {
        board[i] = []; 
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }


    }

    const markSpot = (player, row, col) => {
        board[row][col].changeValue(player);

    }

    const printBoard = () => {
        for (let i = 0; i < rows; i++) {
            console.log(`Row ${i}: ${board[i][0].getValue()} ${board[i][1].getValue()} ${board[i][2].getValue()}`);
        }
    }

    const getBoard = () => board;

    return { printBoard, markSpot, getBoard };


}   

function Cell () {
    let value = 0; 

    const changeValue = (player) => value = player.marker;

    const getValue = () => value;

    return {changeValue, getValue}
}


function GameController () {
    let board = Gameboard();
    let players = [
        {
            name: 'Player One',
            marker: 'X'
        },
        {
            name: 'Player Two',
            marker: 'O'
        }
    ]
    let winner;
    let activePlayer = players[0];

    let getActivePlayer = () => activePlayer;

    let switchPlayerTurn = () => activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];

    
    let UserInput =  () => {
        let row, col; 
    
        while (true) {
            console.log("runnign the llooop.");
            row = prompt("Enter a row number.");
            col = prompt("Enter a column number.");
        
            if (row in ['0', '1', '2'] && col in ['0', '1', '2']){
                row = +row;
                col = +col; 
                if (board.getBoard()[row][col].getValue() === 0) {
                    console.log(`The value of row is ${row} and the value of column is ${col}`);
                    return {row, col};
                }
                else {
                    alert("There is already a marker there.\n");
        
                }
            }
            else {
                alert("Enter a valid input.\n");
            }
            
        }
    
    }

    let checkWinner = (player, row, col) => {
        let winner;


        //row wins
        for (let i = 0; i < board.getBoard()[row].length; i++) {
            if (board.getBoard()[row][i].getValue() != player.marker) {
                break;
            }
            if (i === 2) {
                console.log("The winner is assigned. row win");
                winner = player;
            }
        }

        //col wins
        let columnContainer = board.getBoard().map((row) => row[col].getValue());
        for (let i = 0; i < columnContainer.length; i++) {
            if (columnContainer[i] != player.marker) {
                break;
            }
            if (i === 2){
                console.log("The winner is assigned. col win");
                winner = player;
            } 
        }

        // diagonal wins 
        if (board.getBoard()[0][0].getValue() === player.marker && board.getBoard()[1][1].getValue() === player.marker && board.getBoard()[2][2].getValue() === player.marker) {
            console.log("The winner is assigned. normal diag");

            winner = player;
        }
        if (board.getBoard()[0][2].getValue() === player.marker && board.getBoard()[1][1].getValue() === player.marker && board.getBoard()[2][0].getValue() === player.marker) {
            console.log("The winner is assigned. diag pt 2");

            winner = player; 
        }


        let getWinner = () => winner;

        return {getWinner};
    }
    
    let getWinner = () => winner;

    let printRound = () => {
        console.log(`It is currently ${activePlayer.name}'s turn.\n`);
        board.printBoard();
    }
    


    let playRound = () => {

        let {row, col} = UserInput();
        board.markSpot(activePlayer, row, col);
        printRound();
        winner = checkWinner(activePlayer, row, col).getWinner();
        switchPlayerTurn();
        
    }

    return {playRound, getWinner, getActivePlayer};


}

function Game () {
    game = GameController(); 

    while (!game.getWinner()) {
        game.playRound();

    }

    alert(`The winner is ${game.getWinner().name}!`);

}

Game();

// GameController().playRound();
// board = Gameboard();
// board.printBoard();
// player = {
//     marker: 'X'
// }

// let {row, col} = UserInput();


// function ScreenController () {
//     const game = GameController();
//     const playerTurnDiv = document.querySelector('.turn');
//     const boardDiv = document.querySelector('.board');


//     const updateScreen = () => {
//         boardDiv.textContent = "";

//         const board = game.getBoard();
//         const activePlayer = game.getActivePlayer();

//         playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

//         board.forEach((cell, index) => {
            
//             for (let i = 0; i < board.length; i++) {
//                 const cellButton = document.createElement("button");
//                 cellButton.classList.add("cell");
//                 cellButton.dataset.row = index; 
//                 cellButton.dataset.column = column;
//                 cellButton.textContent = cell.getValue();
//                 boardDiv.appendChild(cellButton);
              

//             }
//         })
//     }

//     function clickHandlerBoard(e) {
//         const selectedColumn = e.target.dataset.column;
//         const selectedRow = e.target.dataset.row;

//         if(!selectedColumn || !selectedRow) return;

//         game.playRound(selectedRow, selectedColumn);
//         updateScreen();

//     }
//     boardDiv.addEventListener("click", clickHandlerBoard);

//     updateScreen();


// }

// ScreenController();