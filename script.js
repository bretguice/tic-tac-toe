const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const CPU_CLASS = CIRCLE_CLASS;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

const winningMessageTextElement = document.getElementById('messageText');
const cellElement = document.querySelectorAll('[data-cell]');
const winningMessageElement = document.getElementById('winningMessage');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
let circleTurn;
let cpuTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn= false;
    cellElement.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();

    }
   
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.textContent = "Draw!";
        console.log('draw');

    }else {
        winningMessageTextElement.textContent = `${circleTurn ? "O's" : 
        "X's"} Wins!`;
        console.log('win');
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
   
}

function swapTurns() {
    circleTurn = !circleTurn;
    cpuTurn = !cpuTurn;
    if(cpuTurn) {
        cpuMove();
    }

}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass);
        })
    })
}

function replayMove(){
    cpuMove();
}

function cpuMove() {
    let updatedBoard = document.querySelectorAll(".cell:not(.x):not(.circle)");
    const r = Math.floor(Math.random()*(updatedBoard.length - 1));
    if(updatedBoard[r].classList.contains(X_CLASS) && 
    updatedBoard[r].classList.contains(CIRCLE_CLASS)){
        replayMove();

    } else {
        placeMark(updatedBoard[r], CPU_CLASS);
        if (checkWin(CPU_CLASS)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();

        }
    }
}

const bestMove = () => {
 
    const gameBoard = 
    [0, 1, 2,
     3, 4, 5,
     6, 7, 8]
}

// function minimax()