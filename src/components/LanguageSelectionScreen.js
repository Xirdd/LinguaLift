import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from '../styles/LanguageSelectionStyles';

const languages = ['English', 'Spanish'];

export default function LanguageSelectionScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Choose Your Language</Text>
            {languages.map((lang, index) => (
        <TouchableOpacity
            key={index}
            style={styles.languageButton}
            onPress={() => navigation.navigate('LevelSelection', { selectedLanguage: lang })}
        >
            <Text style={styles.languageText}>{lang}</Text>
        </TouchableOpacity>
        ))}
    </SafeAreaView>
    );
}
