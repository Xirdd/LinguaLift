import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#050533',
    },
    title: {
        fontSize: 28,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 14,  // Increased padding for better touch target
        marginBottom: 16,
        backgroundColor: '#fff',
        fontSize: 16,  // Added font size for input text
    },
    button: {
        backgroundColor: '#5A98AF',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 12,
        fontSize: 14,  // Slightly smaller font size for link
    },
    safeContainer: {
        flex: 1,  // Ensure full screen height
    },
});
