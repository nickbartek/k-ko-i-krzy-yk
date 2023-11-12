document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    let currentPlayer = 'X';
    let gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][0] !== '') {
                return gameBoard[i][0];
            }
            if (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[0][i] !== '') {
                return gameBoard[0][i];
            }
        }

        if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== '') {
            return gameBoard[0][0];
        }

        if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== '') {
            return gameBoard[0][2];
        }

        return null;
    }

    function isBoardFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] === '') {
                    return false;
                }
            }
        }
        return true;
    }

    function endGame(winner) {
        if (winner) {
            alert(`Player ${winner} wins!`);
        } else {
            alert("It's a draw!");
        }
        resetGame();
    }

    function resetGame() {
        gameBoard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        currentPlayer = 'X';
        updateBoard();
    }

    function updateBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.textContent = gameBoard[i][j];
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
        }
    }

    function handleCellClick(event) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if (gameBoard[row][col] === '' && !checkWinner()) {
            gameBoard[row][col] = currentPlayer;
            updateBoard();

            const winner = checkWinner();
            if (winner) {
                endGame(winner);
            } else if (isBoardFull()) {
                endGame(null);
            } else {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            }
        }
    }

    resetGame();
});




