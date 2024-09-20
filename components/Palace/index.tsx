import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SquareRow from '../SquareRow';

const Palace = () => {
    const NUM_OF_NEIGHBORS = 8;
    const neighbors = [
        [-1, 0], // Up
        [1, 0],  // Down
        [0, -1], // Left
        [0, 1],  // Right
        [-1, -1], // Up Left
        [-1, 1],  // Up Right
        [1, -1],  // Down Left
        [1, 1]    // Down Right
    ];

    const [numberOfRegions, setNumberOfRegions] = useState(9);
    const [grid, setGrid] = useState([]);
    const [gameAnswer, setGameAnswer] = useState([]);



    const generateGameAnswer = () => {
        const answer = [];
        const isSafe = (row, col, placedQueens) => {
            // Check if this row or column is already occupied
            for (let prevQueen of placedQueens) {
                if (prevQueen.row === row || prevQueen.col === col) return false;

                // Check diagonals
                if (Math.abs(prevQueen.row - row) === Math.abs(prevQueen.col - col)) return false;
            }
            return true;
        };

        const solveNQUtil = (row, placedQueens) => {
            if (row === numberOfRegions) {
                setGameAnswer([...placedQueens]);
                return true;
            }

            // Shuffle the columns randomly for each row
            const availableColumns = Array.from({ length: numberOfRegions }, (_, i) => i);
            for (let i = availableColumns.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [availableColumns[i], availableColumns[j]] = [availableColumns[j], availableColumns[i]];
            }

            for (let col of availableColumns) { // Iterate through shuffled columns
                if (isSafe(row, col, placedQueens)) {
                    placedQueens.push({ row, col });
                    if (solveNQUtil(row + 1, placedQueens)) return true;
                    placedQueens.pop();
                }

            }
            return false;
        };

        solveNQUtil(0, []);
    };
    useEffect(() => {
        generateGrid();
        generateGameAnswer();
    }, []);

    const generateGrid = () => {
        const newGrid = [];

        for (let row = 0; row < numberOfRegions; row++) {
            const newRow = [];
            for (let col = 0; col < numberOfRegions; col++) {
                newRow.push({ value: "", isUserPlaced: false, regionColor: "red", parentTile: { row: null, col: null } });
            }
            newGrid.push(newRow);
        }

        setGrid(newGrid);
    };

    const autoPlaceXtoUnavailableTiles = (row, col, gridModified) => {

        const newGrid = [...gridModified];
        for (let i = 0; i < numberOfRegions; i++) {
            if (newGrid[row][i].value === "") {
                newGrid[row][i].value = "x";
                newGrid[row][i].isUserPlaced = false;
                newGrid[row][i].parentTile = { row, col };
            }
            if (newGrid[i][col].value === "") {
                newGrid[i][col].value = "x";
                newGrid[i][col].isUserPlaced = false;
                newGrid[i][col].parentTile = { row, col };
            }
        }
        for (const [dx, dy] of neighbors) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (newRow >= 0 && newRow < newGrid.length && newCol >= 0 && newCol < newGrid[newRow].length) {
                if (newGrid[newRow][newCol].value === "") {
                    newGrid[newRow][newCol].value = "x";
                    newGrid[newRow][newCol].isUserPlaced = false;
                    newGrid[newRow][newCol].parentTile = { row, col };
                }
            }
        }


        return newGrid
    }
    const autoRemoveAllX = (row, col, gridModified) => {
        const newGrid = [...gridModified];

        const removeX = (r, c) => {
            if (r < 0 || r >= newGrid.length || c < 0 || c >= newGrid[r].length) return;
            if (newGrid[r][c].value === "x" && !newGrid[r][c].isUserPlaced &&
                newGrid[r][c].parentTile.row === row && newGrid[r][c].parentTile.col === col) {
                newGrid[r][c].value = "";
                newGrid[r][c].isUserPlaced = false;
                // Recursively remove neighbors
                for (const [dx, dy] of neighbors) {
                    removeX(r + dx, c + dy);
                }
            }
        };

        // Start removal from the selected tile
        removeX(row, col);

        // Also check the row and column
        for (let i = 0; i < numberOfRegions; i++) {
            removeX(row, i);
            removeX(i, col);
        }

        return newGrid;
    };

    const handleOnPressSquare = (rowIndex, colIndex) => {
        const newGrid = [...grid];
        if (newGrid[rowIndex][colIndex].value === "") {
            newGrid[rowIndex][colIndex].value = "x";
            newGrid[rowIndex][colIndex].isUserPlaced = true;
            return setGrid(autoRemoveAllX(rowIndex, colIndex, newGrid))
            // return setGrid(newGrid)
        }

        if (newGrid[rowIndex][colIndex].value === "x") {
            newGrid[rowIndex][colIndex].value = "q";
            newGrid[rowIndex][colIndex].isUserPlaced = true;
            return setGrid(autoPlaceXtoUnavailableTiles(rowIndex, colIndex, newGrid))
            // return setGrid(newGrid)
        }
        if (newGrid[rowIndex][colIndex].value === "q") {
            newGrid[rowIndex][colIndex].value = "";
            newGrid[rowIndex][colIndex].isUserPlaced = false;
            return setGrid(autoRemoveAllX(rowIndex, colIndex, newGrid))
            // return setGrid(newGrid)

        }


    };



    return (
        <View style={styles.container}>
            {grid.map((row, rowIndex) => (
                <SquareRow key={rowIndex} row={row} rowIndex={rowIndex} onPress={handleOnPressSquare} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: 'black',
    },
});

export default Palace;