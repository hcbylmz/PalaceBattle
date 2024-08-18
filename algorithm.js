function createGrid() {
    const gridSize = 9;
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill('.'));

    function isSafe(grid, row, col) {
        // Check this row on left side
        for (let i = 0; i < col; i++) {
            if (grid[row][i] === 'Q') return false;
        }

        // Check upper diagonal on left side
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (grid[i][j] === 'Q') return false;
        }

        // Check lower diagonal on left side
        for (let i = row, j = col; j >= 0 && i < gridSize; i++, j--) {
            if (grid[i][j] === 'Q') return false;
        }

        // Check diagonal neighbors
        const neighbors = [
            [row - 1, col - 1], [row - 1, col + 1],
            [row + 1, col - 1], [row + 1, col + 1]
        ];

        for (let [r, c] of neighbors) {
            if (r >= 0 && r < gridSize && c >= 0 && c < gridSize && grid[r][c] === 'Q') {
                return false;
            }
        }

        return true;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function solve(grid, col) {
        if (col >= gridSize) return true;

        const rows = Array.from({ length: gridSize }, (_, i) => i);
        shuffle(rows);

        for (let i of rows) {
            if (isSafe(grid, i, col)) {
                grid[i][col] = 'Q';

                if (solve(grid, col + 1)) return true;

                grid[i][col] = '.'; // Backtrack
            }
        }

        return false;
    }

    if (!solve(grid, 0)) {
        console.log("Solution does not exist");
        return false;
    }

    return grid;
}

const grid = createGrid();
if (grid) {
    console.log(grid.map(row => row.join(' ')).join('\n'));
}