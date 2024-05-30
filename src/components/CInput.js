import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CInput = ({ label, value, onChange, placeholder }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                value={value}
                onChangeText={onChange}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});

export default CInput;
