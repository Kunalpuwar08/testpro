import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addCart } from '../../redux/slices/userSlice';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [listOfData, setListOfData] = useState([]);

  useEffect(() => {
    try {
      axios.get("https://api.restful-api.dev/objects")
        .then(res => setListOfData(res.data))
        .catch(err => console.log(err))
    } catch (error) {
      console.log(error);
    }
  }, [])

  const addToCart = (item) => {
    dispatch(addCart(item));
  };

  const renderCard = ({ item, index }) => {
    return (
      <TouchableOpacity key={index}>
        <Text>{item?.name}</Text>
        <TouchableOpacity onPress={() => addToCart(item)}>
          <Text>Add to cart</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <Text>List Of Data</Text>

        <FlatList
          data={listOfData}
          renderItem={renderCard}
        />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})