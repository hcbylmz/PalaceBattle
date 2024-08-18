import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import SquareItem from '../SquareItem';

interface SquareProps {
    row: number[],
    rowIndex: number,
    onSquarePress: (rowIndex: number, colIndex: number) => void,
    colIndex: number,
    cell: number
}
const Square: React.FC<SquareProps> = ({ row, rowIndex, onSquarePress, colIndex, cell }) => {
    return (
        <View style={styles.row}>
            {row.map((cell, colIndex) => (
                <SquareItem
                    key={colIndex}
                    value={cell}
                    onPress={() => onSquarePress(rowIndex, colIndex)}
                />
            ))}
        </View>
    )
}

export default Square