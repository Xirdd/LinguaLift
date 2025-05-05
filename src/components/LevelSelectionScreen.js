    import React from 'react';
    import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import styles from '../styles/LevelSelectionStyles';

    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    export default function LevelSelectionScreen({ route, navigation }) {
    const { selectedLanguage } = route.params;

    const handleLevelSelect = async (level) => {
        try {
        await AsyncStorage.setItem('selectedLevel', level);

        // Navigate to the appropriate module based on the selected language
        if (selectedLanguage === 'English') {
            navigation.reset({
            index: 0,
            routes: [{ name: 'EnglishModule' }],
            });
        } else if (selectedLanguage === 'Spanish') {
            navigation.reset({
            index: 0,
            routes: [{ name: 'SpanishModule' }],
            });
        }
        } catch (error) {
        console.error('Error saving level:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
            What is your level in {selectedLanguage}?
        </Text>
        {levels.map((level, index) => (
            <TouchableOpacity
            key={index}
            style={styles.levelButton}
            onPress={() => handleLevelSelect(level)}
            >
            <Text style={styles.levelText}>{level}</Text>
            </TouchableOpacity>
        ))}
        </SafeAreaView>
    );
    }
