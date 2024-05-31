import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CInput from '../../components/CInput';
import MyButton from '../../components/MyButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Auth = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    try {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const onGoogleLogin = () => { };
  const onMicroLogin = () => { }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.heading}>My APP</Text>

        <View style={styles.inputView}>
          <CInput
            placeholder={'Enter Your Email'}
            value={email}
            onChange={txt => setEmail(txt)}
          />
          <CInput
            placeholder={'Enter Your Password'}
            value={password}
            onChange={txt => setPassword(txt)}
          />
          <MyButton onPress={onLogin} title={'Login'} />
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{ textAlign: 'center', margin: 8, color: 'blue' }}>
              Don't have an account? click here
            </Text>
          </TouchableOpacity>

          <MyButton onPress={onGoogleLogin} title={'Login with Google'} />
          <MyButton onPress={onMicroLogin} title={'Login with Microsoft'} />

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    width: '90%',
    height: '50%',
    margin: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputView: {
    width: '90%',
    alignSelf: 'center',
    height: 'auto',
    padding: 8,
  },
});
