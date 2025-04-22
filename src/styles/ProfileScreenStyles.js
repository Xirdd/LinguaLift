    import { StyleSheet } from 'react-native';

    export default StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#050533',
    },
    container: {
        flex: 1,
        backgroundColor: '#050533',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center', // center content vertically
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#EDEDED',
        marginBottom: 20,
        textAlign: 'center',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#5A98AF',
        shadowColor: '#f8f8f7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    infoContainer: {
        backgroundColor: '#f8f8f7',
        borderRadius: 15,
        padding: 25,
        width: '90%',
        maxWidth: 400,
        marginTop: 10,
        shadowColor: '#f8f8f7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    label: {
        fontSize: 14,
        color: '#656561',
        marginTop: 12,
    },
    info: {
        fontSize: 18,
        color: '#2B2B2B',
        fontWeight: '600',
    },
    });
