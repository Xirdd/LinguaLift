    import React from 'react';
    import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
    import styles from '../styles/LevelSelectionStyles';

    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    export default function LevelSelectionScreen({ route, navigation }) {
    const { selectedLanguage } = route.params;

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
            What is your level in {selectedLanguage}?
        </Text>
        {levels.map((level, index) => (
            <TouchableOpacity
            key={index}
            style={styles.levelButton}
            onPress={() => navigation.navigate('Home')}
            >
            <Text style={styles.levelText}>{level}</Text>
            </TouchableOpacity>
        ))}
        </SafeAreaView>
    );
    }
