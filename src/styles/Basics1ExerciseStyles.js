    import { StyleSheet } from 'react-native';

    export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050533',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    finalScore: {
        fontSize: 22,
        color: '#a5b4fc',
        textAlign: 'center',
        marginBottom: 40,
    },
    score: {
        fontSize: 18,
        color: '#a5b4fc',
        marginBottom: 10,
        textAlign: 'right',
    },
    question: {
        fontSize: 22,
        color: '#fff',
        marginBottom: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6366F1',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 14,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    });
