import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: Dimensions.get('window').width / 1,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        borderColor: '$e0e0e0',
    }
})