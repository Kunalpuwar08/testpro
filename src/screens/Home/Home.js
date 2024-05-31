import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {addCart} from '../../redux/slices/userSlice';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [listOfData, setListOfData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get('https://api.restful-api.dev/objects')
        .then(res => setListOfData(res.data))
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const addToCart = item => {
    dispatch(addCart(item));
  };

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.card} key={index}>
        <Text style={styles.cardTxt}>{item?.name}</Text>
        <TouchableOpacity
          testID={`add-to-cart-button-${index}`}
          style={styles.cardBtn}
          onPress={() => addToCart(item)}>
          <Text style={styles.cardBtnTxt}>Add to cart</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.heading}>List Of Data</Text>

        <FlatList
          data={listOfData}
          renderItem={renderCard}
          keyExtractor={(i, e) => e}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => navigation.navigate('Cart')}>
        <Text style={{color: '#000'}}>cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

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
    marginBottom: 12,
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
    backgroundColor: 'purple',
  },
  cardBtnTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
    right: 10,
    elevation: 5,
  },
});
