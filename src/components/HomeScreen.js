import React, { useState, useEffect } from 'react';
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
  { title: 'Basics 1', icon: 'language', completed: true },
  { title: 'Basics 2', icon: 'book', completed: false },
];

export default function HomeScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState(null);
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
      case 'Basics 1':
        navigation.navigate('Basics1Exercise');
        break;
      case 'Basics 2':
        navigation.navigate('VoiceAnswerExercise');
        break;
      default:
        break;
    }
  };

  const handleSpeechPress = () => {
    navigation.navigate('SpeechRecognitionScreen', {
      question: 'How do you say "Hello" in Spanish?',
      correctAnswer: 'Hola',
    });
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
        <View style={{ marginVertical: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 16 }}>Language: {language}</Text>
          <Text style={{ fontSize: 16 }}>Level: {level}</Text>
          <TouchableOpacity onPress={handleReset}>
            <Text style={{ color: '#6366F1', marginTop: 5 }}>Change Language/Level</Text>
          </TouchableOpacity>
        </View>

        {/* Lesson List */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {lessons.map((lesson, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.lessonCard,
                lesson.completed && styles.lessonCardCompleted,
              ]}
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

        {/* Start Speaking Button */}
        <TouchableOpacity style={styles.speechButton} onPress={handleSpeechPress}>
          <MaterialIcons name="keyboard-voice" size={24} color="#fff" />
          <Text style={styles.speechButtonText}>Start Speaking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
