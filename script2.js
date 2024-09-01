function Gameboard () {
    let rows = 3;
    let cols = 3; 
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = []
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




    const position = (() => {
        let col;
        let row;
        const askPosition = () => {
            console.log("Waiting for input from user:\n");
            row = prompt("Enter the row");
            col = prompt("Enter the col\n");

        }

        const getRow = ()=> row;
        const getCol = () => col;

        return {askPosition, getRow, getCol};
    })();




    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.\n`);
    }

    const checkWinner = () => {
        
    }


    function playRound () {
        try {
            position.askPosition();
            board.markSpot(getActivePlayer(), position.getRow(), position.getCol());
            checkWinner();
            switchPlayerTurn();
            printNewRound();
        } catch (error) {
            console.log(error);
        }
    }


    return {playRound};



}

function Game () {
    const game = GameController();

    let counter = 0;

    while (counter < 3) {
        game.playRound();
        counter++;
    }
}


Game();

