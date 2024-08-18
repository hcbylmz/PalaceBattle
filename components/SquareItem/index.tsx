import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

const SquareItem = ({ colIndex, value, onPress }) => {

    return (
        <TouchableOpacity style={styles.square} onPress={onPress}>
            <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
    )
}

export default SquareItem