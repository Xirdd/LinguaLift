    import { StyleSheet } from 'react-native';

    export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050533',
        padding: 20,
        justifyContent: 'center',
    },
    question: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 16,
        color: '#FFF',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6366F1',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: '600',
    },
    feedback: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 16,
    },
    correct: {
        color: '#22c55e',
    },
    incorrect: {
        color: '#ef4444',
    },
    recognized: {
        fontSize: 18,
        color: '#E0E0E0',
        textAlign: 'center',
        marginTop: 10,
    },
    });
