    // VoiceAnswerExerciseScreen.js
    import React, { useState } from 'react';
    import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import * as Speech from 'expo-speech';
    import styles from '../styles/VoiceAnswerExerciseStyles';

    const VoiceAnswerExerciseScreen = () => {
    const question = 'How do you say "Hello" in Spanish?';
    const correctAnswer = 'Hola';

    const [isListening, setIsListening] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [recognizedWord, setRecognizedWord] = useState('');

    const simulateVoiceRecognition = async () => {
        setIsListening(true);
        setFeedback('');
        setRecognizedWord('');

        setTimeout(() => {
        const simulatedUserInput = Math.random() < 0.5 ? 'Hola' : 'Adiós';
        setRecognizedWord(simulatedUserInput);

        if (simulatedUserInput.toLowerCase() === correctAnswer.toLowerCase()) {
            setFeedback('✅ Correct! Great job!');
            Speech.speak('Correct! Great job!');
        } else {
            setFeedback('❌ Incorrect. Try again!');
            Speech.speak('Incorrect. Try again!');
        }

        setIsListening(false);
        }, 2000);
    };

    const isCorrect = feedback.includes('Correct');

    return (
        <View style={styles.container}>
        <Text style={styles.question}>{question}</Text>

        <TouchableOpacity
            style={styles.button}
            onPress={simulateVoiceRecognition}
            disabled={isListening}
        >
            {isListening ? (
            <ActivityIndicator size="large" color="#fff" />
            ) : (
            <>
                <Ionicons name="mic" size={24} color="#fff" />
                <Text style={styles.buttonText}>Tap to Speak</Text>
            </>
            )}
        </TouchableOpacity>

        {recognizedWord !== '' && (
            <Text style={styles.recognized}>You said: "{recognizedWord}"</Text>
        )}

        {feedback !== '' && (
            <Text style={[styles.feedback, isCorrect ? styles.correct : styles.incorrect]}>
            {feedback}
            </Text>
        )}
        </View>
    );
    };

    export default VoiceAnswerExerciseScreen;
