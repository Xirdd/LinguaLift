    import React, { useEffect, useState } from 'react';
    import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity
    } from 'react-native';
    import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import styles from '../styles/HomeScreenStyles';

    const lessons = [
    { title: 'Basic 1', icon: 'language', completed: true },
    { title: 'Basic 2', icon: 'book', completed: false },
    ];

    export default function SpanishModule({ navigation }) {
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('');

    useEffect(() => {
        const loadPreferences = async () => {
        const storedLang = await AsyncStorage.getItem('selectedLanguage');
        const storedLevel = await AsyncStorage.getItem('selectedLevel');
        setLanguage(storedLang || 'N/A');
        setLevel(storedLevel || 'N/A');
        };
        loadPreferences();
    }, []);

    const handleLessonPress = (lesson) => {
        switch (lesson.title) {
        case 'Basic 1':
            navigation.navigate('Basics1Exercise');
            break;
        case 'Basic 2':
            navigation.navigate('VoiceAnswerExercise');
            break;
        }
    };

    const handleReset = async () => {
        await AsyncStorage.removeItem('selectedLanguage');
        await AsyncStorage.removeItem('selectedLevel');
        navigation.reset({
        index: 0,
        routes: [{ name: 'LanguageSelection' }],
        });
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.header}>LinguaLift</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={styles.profileIcon}
            >
                <FontAwesome5 name="user" size={24} color="#fff" />
            </TouchableOpacity>
            </View>

            {/* Language and Level Info */}
            <View style={{ marginVertical: 20, alignItems: 'flex-start', width: '100%' }}>
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '500' }}>Language: {language}</Text>
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '500' }}>Level: {level}</Text>
            </View>

            {/* Lesson List */}
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {lessons.map((lesson, index) => (
                <TouchableOpacity
                key={index}
                style={[styles.lessonCard, lesson.completed && styles.lessonCardCompleted]}
                onPress={() => handleLessonPress(lesson)}
                >
                <View style={styles.lessonIconContainer}>
                    <FontAwesome5
                    name={lesson.icon}
                    size={24}
                    color={lesson.completed ? '#fff' : '#6366F1'}
                    />
                </View>
                <View style={styles.lessonContent}>
                    <Text
                    style={[
                        styles.lessonText,
                        lesson.completed && styles.lessonTextCompleted,
                    ]}
                    >
                    {lesson.title}
                    </Text>
                    {lesson.completed && (
                    <MaterialIcons
                        name="check-circle"
                        size={24}
                        color="#fff"
                        style={styles.completedIcon}
                    />
                    )}
                </View>
                </TouchableOpacity>
            ))}
            </ScrollView>

            {/* Change Language/Level */}
            <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
            <TouchableOpacity onPress={handleReset}>
                <Text style={{ color: '#6366F1', fontSize: 16 }}>Change Language</Text>
            </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
    }
