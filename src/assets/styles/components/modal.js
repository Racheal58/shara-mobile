import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 30,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
  },
  openButton: {
    padding: 10,
    elevation: 2,
    width: '100%',
    backgroundColor: '#023047',
    borderRadius: 6,
    height: 45,
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#023047',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    marginBottom: 30,
    padding: '0.375% 0.75% 0.375% 0%',
    color: '#023047',
    width: '100%',
    height: 44,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'row',
  },
  cancelButton: {
    padding: 10,
    marginBottom: 20,
  },
  cancelText: {
    color: '#023047',
    fontFamily: 'Poppins-semi-bold',
    fontSize: 16,
  },
});
