    import { StyleSheet } from 'react-native';

    export default StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#050533',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    practiceTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#A5B4FC',
        marginBottom: 12,
        textAlign: 'center',
    },
    practiceQuestion: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    feedbackText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
    optionButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginTop: 20,
    },
    correctOption: {
        backgroundColor: '#4ADE80',
    },
    wrongOption: {
        backgroundColor: '#F87171',
    },
    optionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    });
    // This code is a React Native component that allows users to practice speaking sentences.