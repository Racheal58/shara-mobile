import { StyleSheet } from 'react-native';
import placeholders from './placeholders';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullButton: {
    backgroundColor: '#B4B4B4',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    width: '100%',
    height: 56,
    borderRadius: 4,
  },
  fullButtonText: {
    fontFamily: 'Poppins-semi-bold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  fullStrokeButton: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: placeholders.tsPurple,
  },
  startButton: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#FBFBFB',
    borderRadius: 24,
    width: 144,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  startButtonText: {
    fontFamily: 'Poppins-medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.3,
    color: '#FBFBFB',
  },
  startButtonIcon: {
    ...placeholders.iconFunc(12),
  },
  playButton: {
    borderRadius: 100,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  playButtonIcon: {
    ...placeholders.iconFunc(36),
    width: 36,
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 5,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  closeIcon: {
    ...placeholders.iconFunc(15),
    width: 15,
  },
  textSmall: {
    fontSize: 12,
  },
  textRight: {
    textAlign: 'right',
  },
  p_xs: {
    padding: 5,
  },
  p_sm: {
    padding: 10,
  },
  p_h_xs: {
    paddingHorizontal: 5,
  },
  p_h_sm: {
    paddingHorizontal: 10,
  },
  p_h_md: {
    paddingHorizontal: 20,
  },
  p_v_xs: {
    paddingVertical: 5,
  },
  p_v_sm: {
    paddingVertical: 10,
  },
  p_v_md: {
    paddingVertical: 20,
  },
  p_v_lg: {
    paddingVertical: 40,
  },
  p_t_xxs: {
    paddingTop: 3,
  },
  p_t_sm: {
    paddingTop: 10,
  },
  p_t_md: {
    paddingTop: 20,
  },
  p_r_xs: {
    paddingRight: 5,
  },
  p_b_sm: {
    paddingBottom: 10,
  },
  p_b_md: {
    paddingBottom: 20,
  },
  p_l_xs: {
    paddingLeft: 5,
  },
  p_l_sm: {
    paddingLeft: 10,
  },
  p_l_md: {
    paddingLeft: 20,
  },
  m_r_xxs: {
    marginRight: 3,
  },
  m_r_xs: {
    marginRight: 5,
  },
  m_r_sm: {
    marginRight: 10,
  },
  m_r_md: {
    marginRight: 20,
  },
  m_r_lg: {
    marginRight: 40,
  },
  m_t_sm: {
    marginTop: 10,
  },
  m_t_md: {
    marginTop: 20,
  },
  m_t_mmd: {
    marginTop: 30,
  },
  m_t_lg: {
    marginTop: 40,
  },
  m_b_xs: {
    marginBottom: 5,
  },
  m_b_sm: {
    marginBottom: 10,
  },
  m_b_md: {
    marginBottom: 20,
  },
  m_b_lg: {
    marginBottom: 40,
  },
  m_b_xlg: {
    marginBottom: 60,
  },
  m_l_xs: {
    marginLeft: 5,
  },
  m_l_sm: {
    marginLeft: 10,
  },
  m_h_xs: {
    marginHorizontal: 5,
  },
  m_h_sm: {
    marginHorizontal: 10,
  },
  m_h_md: {
    marginHorizontal: 20,
  },
  m_v_md: {
    marginVertical: 20,
  },
  m_v_lg: {
    marginVertical: 40,
  },
  row: {
    flexDirection: 'row',
  },
  row_reverse: {
    flexDirection: 'row-reverse',
  },
  col_12: {
    flex: 12,
  },
  col_11: {
    flex: 11,
  },
  col_10: {
    flex: 10,
  },
  col_9: {
    flex: 9,
  },
  col_8: {
    flex: 8,
  },
  col_7: {
    flex: 7,
  },
  col_6: {
    flex: 6,
  },
  col_5: {
    flex: 5,
  },
  col_4: {
    flex: 4,
    width: '25%',
  },
  col_3: {
    flex: 3,
  },
  col_2: {
    flex: 2,
  },
  col_1: {
    flex: 1,
  },
  meditationCard: {
    height: 100,
    backgroundColor: '#FBFBFB',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E5E5E5',
    paddingHorizontal: 18,
    paddingVertical: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  lockIcon: {
    ...placeholders.iconFunc(12),
  },
  meditationCardIdentifier: {
    fontFamily: 'Poppins-regular',
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.12,
  },
  meditationCardTitle: {
    fontFamily: 'Poppins-medium',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#000000',
    marginTop: 6,
    marginBottom: 3,
  },
  meditationCardScripture: {
    fontFamily: 'Poppins-regular',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.3,
    color: '#000000',
    marginTop: 6,
    marginBottom: 3,
  },
  meditationCardPattern: {
    backgroundColor: '#FFC60B',
    width: 88,
    height: 88,
    borderRadius: 100,
    position: 'absolute',
    right: -15,
    bottom: -35,
  },
  divider: {
    height: 2,
    backgroundColor: 'rgba(229, 229, 229, 0.72)',
    marginVertical: 30,
  },
});
