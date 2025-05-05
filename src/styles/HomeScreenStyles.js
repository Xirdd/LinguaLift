import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#050533',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  headerTextContainer: {
    flex: 1,
  },
  header: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  subHeader: {
    fontSize: 16,
    color: '#A5B4FC',
    marginTop: 4,
  },
  profileIcon: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  scrollContainer: {
    width: '100%',
    paddingBottom: 100,
  },
  lessonCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  lessonCardCompleted: {
    backgroundColor: '#6366F1',
  },
  lessonIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  lessonText: {
    fontSize: 18,
    color: '#1F2937',
    fontWeight: '600',
  },
  lessonTextCompleted: {
    color: '#FFF',
  },
  completedIcon: {
    marginLeft: 10,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomLink: {
    color: '#A5B4FC',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  practiceCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  practiceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1F2937',
  },
  practiceQuestion: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 16,
  },
  practiceOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  correctOption: {
    backgroundColor: '#4ADE80',
  },
  wrongOption: {
    backgroundColor: '#F87171',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1B4B',
  },
  feedbackText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
