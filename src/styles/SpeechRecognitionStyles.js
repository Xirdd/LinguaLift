import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050533',
        paddingTop: 16,
    },
    question: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    webview: {
        flex: 1,
    },
    feedbackContainer: {
        padding: 16,
        alignItems: 'center',
    },
    feedbackText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    correct: {
        color: '#22c55e',
    },
    incorrect: {
        color: '#ef4444',
    },
});
