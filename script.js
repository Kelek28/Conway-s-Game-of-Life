let width = window.screen.width;
let height = window.screen.height;
let rowNumber = Math.floor((height - 10) / 25);
let columnNumber = Math.floor((width - 10) / 10);
// var Board = Array(rowNumber).fill(Array(columnNumber))
var Board = [];
for (let row = 0; row < rowNumber; row++) {
    Board.push([])
    for (let column = 0; column < columnNumber; column++) {
        Board[row].push(false)
    }
}
console.log(Board)
let x = 0;
while (x < 500) {
    let a = Math.floor(Math.random() * rowNumber)
    let b = Math.floor(Math.random() * columnNumber)
    if (!Board[a][b]) {
        Board[a][b] = true
        x++;
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} function init() {
    requestAnimationFrame(renderBoard
    )
}
function renderBoard() {

    // remove old board
    var board = document.getElementById("board")
    var table = document.getElementById("table")
    board.removeChild(table)
    var table = document.createElement("table")
    table.id = "table"
    board.appendChild(table)
    // render new one
    for (let i = 0; i < rowNumber; i++) {
        var row = document.createElement("tr")
        table.appendChild(row)
        for (let j = 0; j < columnNumber; j++) {
            var child = document.createElement("td")
            child.id = `[${i}][${j}]`
            Board[i][j] = checkCell(i, j);
            // child.innerHTML = Board[i][j]
            child.classList.add(`Box${Board[i][j] ? "Alive" : "Dead"}`)
            row.appendChild(child)
        }
    }
    sleep(50).then(() => requestAnimationFrame(renderBoard))

}

function checkIfIndexValid(row, column) {
    if (row >= 0 && row < Board.length) {
        if (column >= 0 && column < Board[0].length) {
            return true
        }
    }
    return false
}
function checkCell(row, column) {
    // [ ][ ][ ]
    // [ ][x][ ]
    // [ ][ ][ ]
    var numberOfNeighbours = 0;
    var state;
    // top
    if (checkIfIndexValid(row + 1, column)) {
        if (Board[row + 1][column]) { numberOfNeighbours++ }
    }
    // bottom
    if (checkIfIndexValid(row - 1, column)) {
        if (Board[row - 1][column]) { numberOfNeighbours++ }
        // left
    }
    if (checkIfIndexValid(row, column - 1)) {
        if (Board[row][column - 1]) { numberOfNeighbours++ }
        // right
    }
    if (checkIfIndexValid(row, column + 1)) {
        if (Board[row][column + 1]) { numberOfNeighbours++ }
        // top left
    }
    if (checkIfIndexValid(row + 1, column - 1)) {
        if (Board[row + 1][column - 1]) { numberOfNeighbours++ }
        // top right
    }
    if (checkIfIndexValid(row + 1, column + 1)) {
        if (Board[row + 1][column + 1]) { numberOfNeighbours++ }
        // bottom left
    }
    if (checkIfIndexValid(row - 1, column - 1)) {
        if (Board[row - 1][column - 1]) { numberOfNeighbours++ }
        // bottom right
    }
    if (checkIfIndexValid(row - 1, column + 1)) {
        if (Board[row - 1][column + 1]) { numberOfNeighbours++ }
    }
    // Any ‘on’ cell(at time t - 1) with fewer than two ‘on’ neighbours(at t - 1) transitions to an ‘off’ state at time t.
    if (numberOfNeighbours < 2 && Board[row][column]) {
        return false
    }
    // Any ‘on’ cell(t - 1) with two or three ‘on’ neighbours(t - 1) remains ‘on’ at time t.
    if ((numberOfNeighbours === 2 || numberOfNeighbours === 3) && Board[row][column]) {
        return true
    }
    // Any ‘on’ cell(t - 1) with more than three ‘on’ neighbours(t - 1) transitions to an ‘off’ state at time t
    if (numberOfNeighbours > 3 && Board[row][column]) {
        return false
    }
    // And ‘off’ cell(t - 1) with exactly three ‘on’ neighbours(t - 1) transitions to an ‘on’ state at time t.
    if (numberOfNeighbours == 3 && !Board[row][column]) {
        return true
    }
    return !!Board[row][column]
}