    import React, { useState, useEffect } from 'react';
    import { View, Text, TouchableOpacity, Alert } from 'react-native';
    import Voice from '@react-native-voice/voice';
    import styles from '../styles/Basics1ExerciseStyles';

    const questions = [
    {
        question: 'How do you say "Hello" in Spanish?',
        options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
        answer: 'Hola',
    },
    {
        question: 'What is the Spanish word for "Thank you"?',
        options: ['Perdón', 'Gracias', 'Hola', 'Sí'],
        answer: 'Gracias',
    },
    ];

    export default function Basics1ExerciseScreen({ navigation }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isListening, setIsListening] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechError = onSpeechError;
        return () => {
        Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechResults = (event) => {
        const speech = event.value[0].toLowerCase();
        const correct = currentQuestion.answer.toLowerCase();
        setIsListening(false);

        if (speech.includes(correct)) {
        handleAnswer(currentQuestion.answer);
        } else {
        Alert.alert('Try Again', `You said: ${speech}`);
        }
    };

    const onSpeechError = (e) => {
        console.error('Speech error:', e);
        setIsListening(false);
        Alert.alert('Error', 'Could not recognize your voice.');
    };

    const handleAnswer = (option) => {
        setSelectedOption(option);
        const isCorrect = option === currentQuestion.answer;
        if (isCorrect) setScore((prev) => prev + 1);

        setTimeout(() => {
        setSelectedOption(null);
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            setShowScore(true);
        }
        }, 1000);
    };

    const startListening = async () => {
        try {
        setIsListening(true);
        await Voice.start('en-US'); // or 'es-ES' if you're expecting Spanish input
        } catch (e) {
        console.error(e);
        setIsListening(false);
        }
    };

    if (showScore) {
        return (
        <View style={styles.container}>
            <Text style={styles.question}>Your Score: {score}/{questions.length}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
        );
    }

    return (
        <View style={styles.container}>
        <Text style={styles.question}>{currentQuestion.question}</Text>

        {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrect = currentQuestion.answer === option;
            let backgroundColor = '#6366F1';

            if (selectedOption) {
            if (isCorrect) backgroundColor = '#22c55e';
            else if (isSelected) backgroundColor = '#ef4444';
            }

            return (
            <TouchableOpacity
                key={index}
                style={[styles.button, { backgroundColor }]}
                onPress={() => handleAnswer(option)}
                disabled={!!selectedOption}
            >
                <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
            );
        })}

        <TouchableOpacity
            style={[styles.button, { backgroundColor: isListening ? '#888' : '#10b981', marginTop: 16 }]}
            onPress={startListening}
            disabled={isListening}
        >
            <Text style={styles.buttonText}>
            {isListening ? 'Listening...' : 'Answer with Voice'}
            </Text>
        </TouchableOpacity>

        <Text style={styles.score}>Score: {score}</Text>
        </View>
    );
    }
