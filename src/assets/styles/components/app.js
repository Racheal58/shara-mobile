import { StyleSheet } from 'react-native';
import placeholders from '../base/placeholders';
import globalStyles from '../base/global';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerStyle: {
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 0,
    borderBottomColor: '#F9F9F9',
    shadowOpacity: 0,
  },
  backbutton: {
    marginLeft: 10,
  },
  headerMargin: {
    marginTop: 70,
  },
  rightbutton: {
    marginRight: 10,
  },
  bottomNavIcon: {
    ...placeholders.iconFunc(24),
    marginBottom: -3,
  },
  header: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  headerIcon: {
    ...placeholders.iconFunc(18),
    width: 18,
  },
  headerIcon2: {
    ...placeholders.iconFunc(30),
    width: 30,
  },
  modalHeaderText: {
    fontWeight: 'bold',
    ...globalStyles.m_t_sm,
    ...globalStyles.m_b_md,
  },
});
