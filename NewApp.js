import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import ThemeSetupScreen from './ThemeSetupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userKey, setUserKey] = useState(null);

  // Create a navigation ref
  const navigationRef = useRef();

  // Set the navigation ref
  const setNavigator = (navigator) => {
    navigationRef.current = navigator;
  };

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = async () => {
    try {
      const users = await AsyncStorage.getAllKeys();
      for (const key of users) {
        if (key.startsWith('user_')) {
          const user = await AsyncStorage.getItem(key);
          if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.auth) {
              setUserKey(parsedUser.key);

              navigationRef.current.navigate('ThemeSetupScreen', {
                userKey: parsedUser.key,
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error during app startup: ', error);
    }
  };

  return (
    <NavigationContainer ref={setNavigator}>
      <Stack.Navigator initialRouteName={userKey ? 'ThemeSetupScreen' : 'LoginScreen'}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="ThemeSetupScreen"
          component={ThemeSetupScreen}
          options={{
            title: 'Theme Setup',
            headerShown: false,
            initialParams: { userKey },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
