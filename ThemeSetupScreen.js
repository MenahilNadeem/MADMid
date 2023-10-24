// screens/ThemeSetupScreen.js

import React, { useState,useEffect } from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ThemeSetupScreen = ({ navigation, route }) => {
  const [theme, setTheme] = useState('white');
  
  const userKey = route.params.userKey; // Get the user key from navigation params
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      
      const userData = await AsyncStorage.getItem(`user_${userKey}`);
      
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setTheme(parsedUser.theme || 'white');
      }
    } catch (error) {
      console.error('Error loading theme: ', error);
    }
  }

  const toggleTheme = async () => {
    const newTheme = theme === 'white' ? 'black' : 'white';
    setTheme(newTheme);
    try {
      const userKey = route.params.userKey;
      const userData = await AsyncStorage.getItem(`user_${userKey}`);
      
      if (userData) {
        const parsedUser = JSON.parse(userData);
        console.log(`User ${userKey} lUser data:`, parsedUser);
        parsedUser.theme = newTheme;
        
        console.log(`User ${userKey} Aftertheme update`, parsedUser);
        await AsyncStorage.setItem(`user_${userKey}`, JSON.stringify(parsedUser));
      }
    } catch (error) {
      console.error('Error changing theme: ', error);
    }
  }

  const logout = async () => {
    try {
      const userData = await AsyncStorage.getItem(`user_${userKey}`);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        parsedUser.auth = false; // Set auth to false
        await AsyncStorage.setItem(`user_${userKey}`, JSON.stringify(parsedUser));
        console.log(`User ${userKey} logged out. User data:`, parsedUser);
      }
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error during logout: ', error);
    }
  }
  

  return (
    <View style={{ flex: 1, backgroundColor: theme, alignItems: 'center', justifyContent: 'center' }}>
      <Button title={`Toggle Theme: ${theme}`} onPress={toggleTheme} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default ThemeSetupScreen;