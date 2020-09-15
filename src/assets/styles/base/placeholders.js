import { Platform } from 'react-native';

const iconFunc = dimension => ({
  resizeMode: 'contain',
  height: dimension,
});

const platformStyles = (platformType, styles) => {
  if (Platform.OS === platformType) {
    return styles;
  }
  return {};
};

export default {
  iconFunc,
  platformStyles,
  bgGray: '#F9F9F9',
  gray: '#808080',
  gray2: '#99A3BA',
  gray3: '#6C7486',
  lightGray: '#CDCDCD',
  red: '#FB3259',
  torquois: '#52D0FA',
  mud: '#F5A623',
  brightGreen: '#34F811',
  lightYellow: '#FBE900',
  purple: '#B220DE',
  purple2: '#4E17FF',
  green: '#17F4C3',
  tsPurple: '#4E17FF',
};
