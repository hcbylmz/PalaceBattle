import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Square from '../Square'
import { checkValidity } from '../../helpers/helperFunctions'

const Palace = () => {
    const [grid, setGrid] = useState(Array(9).fill(Array(9).fill("")));

    const [isMoveValid, setIsMoveValid] = useState(true);

    const removeRelatedXMarks = (grid, rowIndex, colIndex) => {
        // Remove 'x' from the row
        for (let i = 0; i < 9; i++) {
            if (grid[rowIndex][i] === "x") grid[rowIndex][i] = "";
        }

        // Remove 'x' from the column
        for (let i = 0; i < 9; i++) {
            if (grid[i][colIndex] === "x") grid[i][colIndex] = "";
        }

        // Remove 'x' from immediate diagonals (assuming you only marked diagonals with 'x')
        if (rowIndex > 0 && colIndex > 0 && grid[rowIndex - 1][colIndex - 1] === "x") {
            grid[rowIndex - 1][colIndex - 1] = "";
        }
        if (rowIndex > 0 && colIndex < 8 && grid[rowIndex - 1][colIndex + 1] === "x") {
            grid[rowIndex - 1][colIndex + 1] = "";
        }
        if (rowIndex < 8 && colIndex > 0 && grid[rowIndex + 1][colIndex - 1] === "x") {
            grid[rowIndex + 1][colIndex - 1] = "";
        }
        if (rowIndex < 8 && colIndex < 8 && grid[rowIndex + 1][colIndex + 1] === "x") {
            grid[rowIndex + 1][colIndex + 1] = "";
        }
    };

    const markUnavailableSquares = (newGrid, rowIndex, colIndex) => {
        // Mark row
        for (let i = 0; i < 9; i++) {
            if (newGrid[rowIndex][i] === "") newGrid[rowIndex][i] = "x"; // Mark row
        }

        // Mark column
        for (let i = 0; i < 9; i++) {
            if (newGrid[i][colIndex] === "") newGrid[i][colIndex] = "x"; // Mark column
        }

        // Mark immediate diagonals
        if (rowIndex > 0 && colIndex > 0 && newGrid[rowIndex - 1][colIndex - 1] === "") {
            newGrid[rowIndex - 1][colIndex - 1] = "x"; // Top-left
        }
        if (rowIndex > 0 && colIndex < 8 && newGrid[rowIndex - 1][colIndex + 1] === "") {
            newGrid[rowIndex - 1][colIndex + 1] = "x"; // Top-right
        }
        if (rowIndex < 8 && colIndex > 0 && newGrid[rowIndex + 1][colIndex - 1] === "") {
            newGrid[rowIndex + 1][colIndex - 1] = "x"; // Bottom-left
        }
        if (rowIndex < 8 && colIndex < 8 && newGrid[rowIndex + 1][colIndex + 1] === "") {
            newGrid[rowIndex + 1][colIndex + 1] = "x"; // Bottom-right
        }
    };

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

        const cellValue = newGrid[rowIndex][colIndex];
        if (cellValue === "q") {
            // Create a copy of the grid before marking unavailable squares
            const gridCopy = newGrid.map(row => [...row]);
            markUnavailableSquares(gridCopy, rowIndex, colIndex);
            setGrid(gridCopy); // Update the state with the modified copy
        } else if (cellValue === "") {  // When removing a queen
            const gridCopy = newGrid.map(row => [...row]);
            // Remove 'x' marks related to the removed queen
            removeRelatedXMarks(gridCopy, rowIndex, colIndex);
            setGrid(gridCopy);
        } else {
            setGrid(newGrid); // Update the state with the unmodified grid
        }

        const valid = checkValidity(newGrid);
        setIsMoveValid(valid);
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