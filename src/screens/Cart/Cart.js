import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const Cart = () => {
    const cartData = useSelector((state) => state.user.cartData);
    const renderCard = ({ item, index }) => {
        return (
            <View key={index}>
                <Text>{item.name}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainView}>
                <Text>Cart List</Text>
                <FlatList data={cartData} renderItem={renderCard} keyExtractor={(i, e) => i.id} />

                <TouchableOpacity style={styles.floatBtn}>
                    <Text>D</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    mainView: {
        width: '90%',
        alignSelf: 'center'
    },
    floatBtn: {
        height: 50,
        width: 50,
        borderRadius: 25,
        color: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10
    }
})