import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
       borderWidth: 1,
       borderColor: 'black',
       alignItems: 'center',
       justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
      },
      square: {
        width: 40, // Adjust the size of the squares as needed
        height: 40, // Adjust the size of the squares as needed
        backgroundColor: 'blue', // Adjust the color as needed
        margin: 1, // Adjust the margin between squares as needed
        justifyContent: 'center',
        alignItems: 'center',
      },
})