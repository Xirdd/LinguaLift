    import React, { useState, useEffect } from 'react';
    import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import * as Speech from 'expo-speech';
    import Voice from '@react-native-voice/voice';
    import styles from '../styles/VoiceAnswerExerciseStyles';

    const VoiceAnswerExerciseScreen = () => {
    const question = 'How do you say "Hello" in Spanish?';
    const correctAnswer = 'Hola';

    const [isListening, setIsListening] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [recognizedWord, setRecognizedWord] = useState('');

    useEffect(() => {
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechError = onSpeechError;

        return () => {
        Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechResults = (event) => {
        const speech = event.value[0] || '';
        setRecognizedWord(speech);

        if (speech.toLowerCase().includes(correctAnswer.toLowerCase())) {
        setFeedback('✅ Correct! Great job!');
        Speech.speak('Correct! Great job!');
        } else {
        setFeedback('❌ Incorrect. Try again!');
        Speech.speak('Incorrect. Try again!');
        }

        setIsListening(false);
    };

    const onSpeechError = (error) => {
        console.error('Speech recognition error:', error);
        setFeedback('❌ Error recognizing speech.');
        setIsListening(false);
    };

    const startListening = async () => {
        try {
        setFeedback('');
        setRecognizedWord('');
        setIsListening(true);
        await Voice.start('es-ES'); // Listening for Spanish
        } catch (error) {
        console.error('Failed to start voice recognition:', error);
        Alert.alert('Error', 'Could not start voice recognition.');
        setIsListening(false);
        }
    };

    const isCorrect = feedback.startsWith('✅');

    return (
        <View style={styles.container}>
        <Text style={styles.question}>{question}</Text>

        <TouchableOpacity
            style={[styles.button, isListening && { backgroundColor: '#888' }]}
            onPress={startListening}
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

        {!isCorrect && feedback && (
            <TouchableOpacity style={styles.retryButton} onPress={startListening}>
            <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
        )}
        </View>
    );
    };

    export default VoiceAnswerExerciseScreen;
