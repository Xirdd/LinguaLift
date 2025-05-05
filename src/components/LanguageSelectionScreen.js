    import React from 'react';
    import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import styles from '../styles/LanguageSelectionStyles';

    const languages = ['English', 'Spanish'];

    export default function LanguageSelectionScreen({ navigation }) {
    const handleLanguageSelect = async (lang) => {
        try {
        await AsyncStorage.setItem('selectedLanguage', lang);
        navigation.navigate('LevelSelection', { selectedLanguage: lang });
        } catch (error) {
        console.error('Error saving language:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Choose Your Language</Text>
        {languages.map((lang, index) => (
            <TouchableOpacity
            key={index}
            style={styles.languageButton}
            onPress={() => handleLanguageSelect(lang)}
            >
            <Text style={styles.languageText}>{lang}</Text>
            </TouchableOpacity>
        ))}
        </SafeAreaView>
    );
    }
