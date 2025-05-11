import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

// Screens
import SplashScreen from '../components/SplashScreen';
import GetStartedScreen from '../components/GetStartedScreen';
import LoginScreen from '../components/LoginScreen';
import RegistrationScreen from '../components/RegistrationScreen';
import LanguageSelectionScreen from '../components/LanguageSelectionScreen';
import LevelSelectionScreen from '../components/LevelSelectionScreen';
import HomeScreen from '../components/HomeScreen';
import ProfileScreen from '../components/ProfileScreen';
import SpanishScreen from '../components/SpanishExerciseScreen';
import EnglishScreen from '../components/EnglishExerciseScreen';
import EnglishVoice from '../components/EnglishVoiceScreen';
import SpanishVoice from '../components/SpanishVoiceScreen';
import EnglishModule from '../components/EnglishModule';
import SpanishModule from '../components/SpanishModule';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState('Splash');
  const [initialParams, setInitialParams] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareNavigation = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          setInitialRoute('Login');
        } else {
          const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
          const selectedLevel = await AsyncStorage.getItem('selectedLevel');

          if (!selectedLanguage) {
            setInitialRoute('LanguageSelection');
          } else if (!selectedLevel) {
            setInitialRoute('LevelSelection');
          } else {
            setInitialRoute('Home');
            setInitialParams({ language: selectedLanguage, level: selectedLevel });
          }
        }
        setIsReady(true);
      });
    };

    prepareNavigation();
  }, []);

  if (!isReady) return null; // Optional: add a loading spinner

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
        <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} />

        {/* Pass initial language and level to HomeScreen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={initialParams}
        />

        <Stack.Screen name="EnglishExercise" component={EnglishScreen} />
        <Stack.Screen name="SpanishExercise" component={SpanishScreen} />
        <Stack.Screen name="EnglishVoice" component={EnglishVoice} />
        <Stack.Screen name="SpanishVoice" component={SpanishVoice} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EnglishModule" component={EnglishModule} />
        <Stack.Screen name="SpanishModule" component={SpanishModule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}