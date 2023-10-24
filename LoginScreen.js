import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');


const handleLogin = async () => {
    try {
      const user = await AsyncStorage.getItem(`user_${login}`);
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.password === password) {
          parsedUser.auth = true;
          await AsyncStorage.setItem(`user_${login}`, JSON.stringify(parsedUser));
        
          
          console.log("i am parsedUser in login",parsedUser)
          console.log("i am parsedUser in login",parsedUser.key)
  
          // Pass the user key when navigating to the "ThemeSetup" screen
          navigation.navigate('ThemeSetupScreen', { userKey: login });
        } else {
          console.log('Invalid password');
        }
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error during login: ', error);
    }
  };
  
  const handleRegistration = async () => {
    try {
      const user = await AsyncStorage.getItem(`user_${login}`);
      if (user) {
        console.log('User already exists');
      } else {
        const newUser = {
          key: login,
          password: password,
          theme: 'white',
          auth: false,
        };
        await AsyncStorage.setItem(`user_${login}`, JSON.stringify(newUser));
        console.log('User registered successfully');
      }
    } catch (error) {
      console.error('Error during registration: ', error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={text => setLogin(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} style={styles.button} />
      <Button title="Register" onPress={handleRegistration} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
