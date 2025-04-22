    import { StyleSheet, Dimensions } from 'react-native';

    const { height } = Dimensions.get('window');

    export default StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#050533', 
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly', 
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff', 
        marginTop: 10,
    },
    logo: {
        width: 180,
        height: height * 0.25,
        marginVertical: 10,
    },
    description: {
        fontSize: 16,
        color: '#ccc', 
        textAlign: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#5A98AF', 
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff', 
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        fontSize: 14,
        color: '#888', 
        marginBottom: 10,
    },
    });
