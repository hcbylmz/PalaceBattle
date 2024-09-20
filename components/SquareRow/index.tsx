import { View, Text } from 'react-native'
import React from 'react'
import SquareItem from '../SquareItem'

const SquareRow = ({ row, onPress, rowIndex }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {row.map((cell, colIndex) => {
        const { value, regionColor, isUserPlaced } = cell
        return (
          <SquareItem isUserPlaced={isUserPlaced}
            value={value} regionColor={regionColor} onPress={onPress} rowIndex={rowIndex} colIndex={colIndex} key={colIndex} />
        )
      })}
    </View>
  )
}

export default SquareRow