const isRowValid = (row) => {
    let count = 0;
    for (let i = 0; i < 9; i++) {
        if (row[i] === "q") {
            count++;
        }
        if (count > 1) {
            return false;
        }
    }
    return true;
}

const isColumnValid = (grid, colIndex) => {
    let count = 0;
    for (let i = 0; i < 9; i++) {
        if (grid[i][colIndex] === "q") {
            count++;
        }
        if (count > 1) {
            return false;
        }
    }
    return true;
}

const isDiagonalValid = (grid, rowIndex, colIndex) => {
    const diagonals = [
        { row: -1, col: -1 }, // Top-left
        { row: -1, col: 1 },  // Top-right
        { row: 1, col: -1 },  // Bottom-left
        { row: 1, col: 1 }    // Bottom-right
    ];

    for (let i = 0; i < diagonals.length; i++) {
        const newRow = rowIndex + diagonals[i].row;
        const newCol = colIndex + diagonals[i].col;
        if (newRow >= 0 && newRow < 9 && newCol >= 0 && newCol < 9) {
            if (grid[newRow][newCol] === "q") {
                return false;
            }
        }
    }
    return true;
}


export const checkValidity = (newGrid) => {
    for (let i = 0; i < 9; i++) {
        if (!isRowValid(newGrid[i])) return false;
        if (!isColumnValid(newGrid, i)) return false;
    }
    // Check diagonals only for "q" placements
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (newGrid[row][col] === "q" && !isDiagonalValid(newGrid, row, col)) {
                return false;
            }
        }
    }
    return true;
};