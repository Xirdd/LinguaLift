    import { StyleSheet } from 'react-native';

    export default StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#10B981',
        padding: 16,
        borderRadius: 12,
    },
    headerTextContainer: {
        flex: 1,
    },
    header: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileIcon: {
        marginLeft: 16,
    },
    infoContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
    },
    resetText: {
        color: '#10B981',
        marginTop: 5,
    },
    scrollContainer: {
        paddingVertical: 20,
    },
    lessonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D1FAE5',
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
    },
    lessonCardCompleted: {
        backgroundColor: '#10B981',
    },
    lessonIconContainer: {
        marginRight: 16,
    },
    lessonContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lessonText: {
        fontSize: 18,
        color: '#000',
    },
    lessonTextCompleted: {
        color: '#fff',
    },
    completedIcon: {
        marginLeft: 8,
    },
    speechButton: {
        backgroundColor: '#10B981',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginTop: 16,
    },
    speechButtonText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 16,
    },
    });
