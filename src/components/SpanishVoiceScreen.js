    import React, { useEffect, useState } from 'react';
    import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
    import { Audio } from 'expo-av';
    import * as FileSystem from 'expo-file-system';
    import styles from '../styles/VoiceAnswerExerciseStyles';

    const questions = [
    { prompt: 'Say: I am learning English', answer: 'i am learning english' },
    { prompt: 'Say: Hello, how are you?', answer: 'hello how are you' },
    { prompt: 'Say: I love programming', answer: 'i love programming' },
    { prompt: 'Say: What is your name?', answer: 'what is your name' },
    ];

    const API_KEY = 'eaef818e56c942d78b8b9616b04f353b';

    export default function EnglishVoiceScreen() {
    const [recording, setRecording] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({ prompt: '', answer: '' });

    const loadRandomQuestion = () => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setCurrentQuestion(questions[randomIndex]);
        setFeedback('');
    };

    useEffect(() => {
        loadRandomQuestion();
    }, []);

    const startRecording = async () => {
        try {
        const { granted } = await Audio.requestPermissionsAsync();
        if (!granted) return Alert.alert('Permission required to record audio');

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        setRecording(recording);
        setIsRecording(true);
        } catch (e) {
        console.error('Start error:', e);
        }
    };

    const normalize = (text) => {
        return text.toLowerCase().replace(/[.,?!]/g, '').trim();
    };

    const stopRecording = async () => {
        try {
        setIsRecording(false);
        setLoading(true);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        const uploadRes = await FileSystem.uploadAsync(
            'https://api.assemblyai.com/v2/upload',
            uri,
            {
            httpMethod: 'POST',
            headers: { Authorization: API_KEY },
            uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
            }
        );

        const { upload_url } = JSON.parse(uploadRes.body);

        const transcriptRes = await fetch('https://api.assemblyai.com/v2/transcript', {
            method: 'POST',
            headers: {
            Authorization: API_KEY,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ audio_url: upload_url }),
        });

        const { id } = await transcriptRes.json();

        const poll = async () => {
            const res = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, {
            headers: { Authorization: API_KEY },
            });
            const data = await res.json();

            if (data.status === 'completed') {
            const spoken = normalize(data.text);
            const expected = normalize(currentQuestion.answer);
            const isCorrect = spoken === expected;

            setFeedback(isCorrect ? '✅ Correct!' : `❌ Incorrect: You said "${data.text}"`);
            setLoading(false);
            } else if (data.status === 'failed') {
            setFeedback('Transcription failed.');
            setLoading(false);
            } else {
            setTimeout(poll, 3000);
            }
        };

        poll();
        } catch (err) {
        console.error('Stop/upload error:', err);
        setFeedback('Error occurred.');
        setLoading(false);
        }
    };

    return (
        <View style={styles.safeContainer}>
        <View style={styles.container}>
            <Text style={styles.practiceTitle}>🎤 Speak the sentence below</Text>
            <Text style={styles.practiceQuestion}>{currentQuestion.prompt}</Text>
            {loading && <ActivityIndicator size="large" color="#6366F1" />}
            {feedback !== '' && <Text style={styles.feedbackText}>{feedback}</Text>}

            <TouchableOpacity
            style={[styles.optionButton, isRecording ? styles.wrongOption : styles.correctOption]}
            onPress={isRecording ? stopRecording : startRecording}
            >
            <Text style={styles.optionText}>{isRecording ? 'Stop' : 'Record'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton} onPress={loadRandomQuestion}>
            <Text style={styles.optionText}>Next</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    }
