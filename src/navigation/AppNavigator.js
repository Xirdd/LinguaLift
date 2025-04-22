import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from '../components/SplashScreen';
import GetStartedScreen from '../components/GetStartedScreen';
import LoginScreen from '../components/LoginScreen';
import RegistrationScreen from '../components/RegistrationScreen';
import HomeScreen from '../components/HomeScreen';
import ProfileScreen from '../components/ProfileScreen';
import LanguageSelectionScreen from '../components/LanguageSelectionScreen';
import LevelSelectionScreen from '../components/LevelSelectionScreen';
import SpeechRecognitionScreen from '../components/SpeechRecognitionScreen';
import Basics1ExerciseScreen from '../components/Basics1ExerciseScreen';
import VoiceAnswerExerciseScreen from '../components/VoiceAnswerExerciseScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="GetStarted" component={GetStartedScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />
                <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
                <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Basics1Exercise" component={Basics1ExerciseScreen} />
                <Stack.Screen name="VoiceAnswerExercise" component={VoiceAnswerExerciseScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Speech" component={SpeechRecognitionScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
