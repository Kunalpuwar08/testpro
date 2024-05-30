import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../../redux/slices/userSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart.cartData);
  const renderCard = ({item, index}) => {
    return (
      <View style={styles.card} key={index}>
        <Text style={styles.cardTxt}>{item.name}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.heading}>Cart List</Text>
        <FlatList
          data={cartData}
          renderItem={renderCard}
          keyExtractor={(i, e) => e}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => dispatch(clearCart())}>
        <Text>clear</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainView: {
    width: '90%',
    alignSelf: 'center',
    margin: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  floatBtn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  card: {
    padding: 8,
    height: 50,
    width: '90%',
    borderWidth: 1,
    alignSelf: 'center',
    margin: 8,
    borderRadius: 8,
  },
  cardTxt: {
    color: '#000',
  },
});
