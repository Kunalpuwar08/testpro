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
import {clearCart, deleteCartItem} from '../../redux/slices/userSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart.cartData);

  const removeFromCart = (item) =>{
    dispatch(deleteCartItem(item));
  }

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.card} key={index}>
      <Text style={styles.cardTxt}>{item?.name}</Text>
      <TouchableOpacity
        style={styles.cardBtn}
        onPress={() => removeFromCart(item)}>
        <Text style={styles.cardBtnTxt}>remove</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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
    width: '90%',
    alignSelf: 'center',
    height: 100,
    padding: 8,
    margin: 6,
    borderWidth: 1,
    borderRadius: 12,
  },
  cardTxt: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    height: '50%',
  },
  cardBtn: {
    width: '100%',
    height: '50%',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  cardBtnTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
