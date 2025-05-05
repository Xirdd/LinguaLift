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
    import Basics1ExerciseScreen from '../components/Basics1ExerciseScreen';
    import VoiceAnswerExerciseScreen from '../components/VoiceAnswerExerciseScreen';

    const Stack = createNativeStackNavigator();

    export default function AppNavigator() {
    const [initialRoute, setInitialRoute] = useState('Splash');
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
            }
            }
            setIsReady(true);
        });
        };

        prepareNavigation();
    }, []);

    if (!isReady) return null; // Optional: return a loading indicator

    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
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
        </Stack.Navigator>
        </NavigationContainer>
    );
    }
