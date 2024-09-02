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


    const getBoard = () => board;

    const markSpot = (player, row, col) => {

        if (board[row][col].getValue() === 0) {
            board[row][col].changeValue(player);
            return;
        }
        else {
            console.log(row, col);
            alert("A player has already placed a marker there.\n");
        }
        


    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };


    return {getBoard, markSpot, printBoard};


}

function Cell () {
    let value = 0; 

    const changeValue = (player) => value = player.marker;

    const getValue = ()=> value;

    return {changeValue, getValue};
}



function GameController () {
    const playerOneName = 'Player One'; 
    const playerTwoName = 'Player Two';

    const playerOneMarker = '1';
    const playerTwoMarker = '2';

    players = [
        {
            name: playerOneName,
            marker: playerOneMarker
        },
        {
            name: playerTwoName,
            marker: playerTwoMarker
        }

    ];

    let board = Gameboard();
    let activePlayer = players[0]
    let winner =0;




    const position = (() => {
        let col = 0;
        let row = 0;
        const askPosition = () => {
            row = prompt("Enter the row");
            col = prompt("Enter the col\n");
            row = +row;
            col = +col;

        }

        const getRow = ()=> row;
        const getCol = () => col;

        return {askPosition, getRow, getCol};
    })();




    const getActivePlayer = () => activePlayer;


    const getWinner = () => winner;

    const switchPlayerTurn = () => activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.\n`);
    }

    const checkWinner = (player, row, col) => {
        // Check the row
        if (board.getBoard()[row].every(cell => cell.getValue() === player.marker)) {
            return player;
        }
    
        // Check the column
        let column = board.getBoard().map(row => row[col]);
        if (column.every(cell => cell.getValue() === player.marker)) {
            return player;
        }
    
        // Check diagonals
        if ((board.getBoard()[0][0].getValue() === player.marker && 
             board.getBoard()[1][1].getValue() === player.marker && 
             board.getBoard()[2][2].getValue() === player.marker) ||
            (board.getBoard()[0][2].getValue() === player.marker && 
             board.getBoard()[1][1].getValue() === player.marker && 
             board.getBoard()[2][0].getValue() === player.marker)) {
            return player;
        }
    
        return false;
    }
    


    function playRound () {
            printNewRound();
            position.askPosition();
            board.markSpot(getActivePlayer(), position.getRow(), position.getCol());
            winner = checkWinner(getActivePlayer(), position.getRow(), position.getCol());
            if (winner) {
                return;
            }
          
            switchPlayerTurn();
   
        }



    return {playRound, getWinner};



}

function Game () {
    const game = GameController();

    let counter = 0;

    while (!game.getWinner()) {
        game.playRound();
        counter++;
    }
    console.log(`Winner: ${game.getWinner().name}\n`);
}


Game();

