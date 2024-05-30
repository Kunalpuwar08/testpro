import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const Cart = () => {
    const cartData = useSelector((state) => state.user.cartData);
    const renderCard = ({ item, index }) => {
        return (
            <View style={styles.card} key={index}>
                <Text style={styles.cardTxt}>{item.name}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainView}>
                <Text style={styles.heading}>Cart List</Text>
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
    heading:{
        fontSize:18,
        fontWeight:'bold',
        color:'#000'
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
    },
    card: {
        padding: 8,
        height: 50,
        width: '90%'
    },
    cardTxt: {
        color: '#fff'
    }
})