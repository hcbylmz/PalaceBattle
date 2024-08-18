import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Square from '../Square'

const Palace = () => {
    const [grid, setGrid] = useState(Array(9).fill(Array(9).fill("")));

    const [isMoveValid, setIsMoveValid] = useState(true);


    const checkValidity = (newGrid) => {
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
                    console.log("diag", newRow, newCol, grid[newRow][newCol])
                    return false;
                }
            }
        }
        return true;
    }


    const handleSquarePress = (rowIndex, colIndex) => {

        if (!isMoveValid && grid[rowIndex][colIndex] !== "q") return;
        const values = ["x", "q", ""];
        const newGrid = grid.map((row, rIndex) => {
            return rIndex === rowIndex
                ? row.map((cell, cIndex) => {
                    if (cIndex === colIndex) {
                        const currentIndex = values.indexOf(cell);
                        const nextIndex = (currentIndex + 1) % values.length;
                        return values[nextIndex];
                    }
                    return cell;
                })
                : row
        });

        const valid = checkValidity(newGrid);
        setIsMoveValid(valid);
        setGrid(newGrid);
    };

    const handleClear = () => {
        setGrid(Array(9).fill(Array(9).fill("")));
        setIsMoveValid(true);
    }

    return (
        <View style={[styles.container, { backgroundColor: isMoveValid ? "green" : "red" }]}>
            <Text>can you do it? {isMoveValid ? "Yes" : "No"}</Text>
            <Pressable onPress={handleClear}>
                <Text>Clear</Text>
            </Pressable>
            {grid.map((row, rowIndex) => (
                <Square
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    onSquarePress={handleSquarePress}
                />
            ))}
        </View>
    )
}

export default Palace