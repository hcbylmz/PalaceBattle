import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

const SquareItem = ({ isUserPlaced, value, onPress, regionColor, rowIndex, colIndex }) => {

    return (
        <TouchableOpacity style={[styles.square, { backgroundColor: regionColor, borderWidth: 1, borderColor: "black" }]} onPress={() => onPress(rowIndex, colIndex)}>
            <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
    )
}

export default SquareItem