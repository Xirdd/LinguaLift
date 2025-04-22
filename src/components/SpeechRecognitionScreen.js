import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../styles/SpeechRecognitionStyles';

export default function SpeechRecognitionScreen({ navigation }) {
    const webViewRef = useRef(null);
    const correctAnswer = 'hola';
    const [feedback, setFeedback] = useState('');

    const handleMessage = (event) => {
        const spokenText = event.nativeEvent.data.trim().toLowerCase();

        if (spokenText === correctAnswer.toLowerCase()) {
            setFeedback('✅ Correct! Great job!');
        } else if (spokenText.startsWith('error')) {
            setFeedback('❌ ' + spokenText);
        } else {
            setFeedback(`❌ Incorrect. You said: "${spokenText}"`);
        }
    };

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <body style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;background:#050533;color:white;font-family:sans-serif;">
            <h2>Tap the Mic</h2>
            <button onclick="startRecognition()" style="padding: 14px 24px; font-size: 18px; border-radius: 12px; background-color: #4F46E5; color: white; border: none;">🎤 Start Listening</button>
            <p id="result" style="margin-top: 20px; font-size: 16px;"></p>

            <script>
                const sendMessage = msg => window.ReactNativeWebView.postMessage(msg);

                function startRecognition() {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    if (!SpeechRecognition) {
                        sendMessage("Speech Recognition not supported");
                        return;
                    }
                    const recognition = new SpeechRecognition();
                    recognition.lang = 'es-ES';
                    recognition.start();

                    recognition.onresult = function(event) {
                        const text = event.results[0][0].transcript;
                        document.getElementById('result').innerText = 'You said: ' + text;
                        sendMessage(text);
                    };

                    recognition.onerror = function(event) {
                        sendMessage("Error: " + event.error);
                    };
                }
            </script>
        </body>
        </html>
    `;

    return (
        <SafeAreaView style={styles.container}>
            <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                onMessage={handleMessage}
                javaScriptEnabled
                style={styles.webview}
            />
            {feedback !== '' && (
                <View style={styles.feedbackContainer}>
                    <Text style={[styles.feedbackText, feedback.includes('✅') ? styles.correct : styles.incorrect]}>
                        {feedback}
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}
