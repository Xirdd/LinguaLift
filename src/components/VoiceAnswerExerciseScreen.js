import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native';
import Voice from '@react-native-voice/voice';

// Optional: Uncomment if you want to handle permissions
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default function VoiceAnswerExerciseScreen() {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const correctAnswer = 'hello';

  useEffect(() => {
    if (!Voice || typeof Voice.onSpeechStart !== 'undefined') {
      Voice.onSpeechStart = () => setIsListening(true);
      Voice.onSpeechEnd = () => setIsListening(false);
      Voice.onSpeechResults = (event) => {
        const text = event.value[0];
        setSpokenText(text);
        validateAnswer(text);
      };
    }

    return () => {
      try {
        Voice.destroy().then(Voice.removeAllListeners);
      } catch (e) {
        console.warn('Voice cleanup error:', e);
      }
    };
  }, []);

  const startListening = async () => {
    // Optional: Request microphone permission for Android
    // if (Platform.OS === 'android') {
    //   const permission = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    //   if (permission !== RESULTS.GRANTED) {
    //     Alert.alert('Permission Denied', 'Microphone permission is required.');
    //     return;
    //   }
    // }

    if (!Voice || typeof Voice.start !== 'function') {
      Alert.alert('Voice Module Error', 'Speech recognition is not available or not linked.');
      return;
    }

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error('Voice start error:', e);
      Alert.alert('Error', e.message || 'Failed to start voice recognition.');
    }
  };

  const validateAnswer = (text) => {
    if (text?.toLowerCase().includes(correctAnswer)) {
      Alert.alert('Correct!', `You said: ${text}`);
    } else {
      Alert.alert('Try Again', `You said: ${text}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Say: "{correctAnswer}"</Text>
      <Button
        title={isListening ? 'Listening...' : 'Start Speaking'}
        onPress={startListening}
        disabled={isListening}
      />
      <Text style={styles.result}>You said: {spokenText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  question: { fontSize: 24, marginBottom: 20 },
  result: { fontSize: 18, marginTop: 20, color: 'blue' },
});
