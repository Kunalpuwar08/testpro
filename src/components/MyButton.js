import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const MyButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btn}>
            <Text style={styles.btnTxt}>{title}</Text>
        </TouchableOpacity>
    )
};

export default MyButton;

const styles = StyleSheet.create({
    btn: {
        width: '90%',
        alignSelf: 'center',
        height: 50,
        backgroundColor: 'purple',
        borderRadius: 12,
        padding: 8,
        alignItems:'center',
        justifyContent:'center'
    },
    btnTxt: {
        color: '#fff',
        fontSize: 14,
        textTransform: 'uppercase'
    }
})
