import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/Basics1ExerciseStyles';

const questions = [
  {
    question: 'What is the Spanish word of "Hello"?',
    options: ['Hola', 'Gracias', 'Adiós', 'Por favor'],
    answer: 'Hola',
  },
  {
    question: 'What is the Spanish word of "Thank you"?',
    options: ['Gracias', 'Perdón', 'Sí', 'Hola'],
    answer: 'Gracias',
  },
  {
    question: 'What is the Spanish word of "Please"?',
    options: ['Gracias', 'Por favor', 'Adiós', 'No'],
    answer: 'Por favor',
  },
  {
    question: 'What is the Spanish word of "Goodbye"?',
    options: ['Hola', 'Gracias', 'Adiós', 'Sí'],
    answer: 'Adiós',
  },
  {
    question: 'What is the Spanish word of "Yes"?',
    options: ['No', 'Perdón', 'Sí', 'Hola'],
    answer: 'Sí',
  },
];

export default function SpanishExerciseScreen({ navigation }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

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

  if (showScore) {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>Your Score: {score}/{questions.length}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SpanishModule')}>
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
          if (isCorrect) backgroundColor = '#22c55e'; // green
          else if (isSelected) backgroundColor = '#ef4444'; // red
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

      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
}
