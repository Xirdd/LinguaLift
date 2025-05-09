import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Audio } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default function VoiceAnswerExerciseScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [loading, setLoading] = useState(false);
  const recordingRef = useRef(null);
  const correctAnswer = 'hello';

  const startRecording = async () => {
    try {
      setSpokenText('');
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Microphone permission is needed to use this feature.');
        return;
      }

      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      recordingRef.current = recording;
      setIsRecording(true);
    } catch (error) {
      console.error('Recording error:', error);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;

      setLoading(true);
      await sendAudioToWhisper(uri);
    } catch (error) {
      console.error('Stop recording error:', error);
      setLoading(false);
    }
  };

  const sendAudioToWhisper = async (uri) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'speech.wav',
        type: 'audio/wav',
      });

      const response = await axios.post('http://192.168.1.188:8081/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const transcribed = response.data.text;
      setSpokenText(transcribed);
      validateAnswer(transcribed);
    } catch (error) {
      console.error('Transcription error:', error);
      Alert.alert('Error', 'Failed to transcribe the audio.');
    } finally {
      setLoading(false);
    }
  };

  const validateAnswer = (text) => {
    if (text?.toLowerCase().includes(correctAnswer.toLowerCase())) {
      Alert.alert('✅ Correct!', `You said: "${text}"`);
    } else {
      Alert.alert('❌ Try Again', `You said: "${text}"`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Say: "{correctAnswer}"</Text>

      <TouchableOpacity
        style={[styles.micButton, isRecording && styles.micButtonActive]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Ionicons name={isRecording ? 'stop' : 'mic'} size={36} color="#fff" />
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />}
      <Text style={styles.result}>You said: {spokenText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  question: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  result: { fontSize: 18, marginTop: 20, color: 'blue', textAlign: 'center' },
  loader: { marginTop: 10 },
  micButton: {
    backgroundColor: '#2196F3',
    borderRadius: 50,
    padding: 20,
    marginTop: 10,
    elevation: 4,
  },
  micButtonActive: {
    backgroundColor: '#D32F2F',
  },
});
