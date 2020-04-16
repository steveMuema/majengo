import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('screen');
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(75);
const colors = {
  white: '#ffffff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  image: {
    height: 300,
    width: slideWidth,
  },
  logoContainer: {
    bottom: 0,
  },
});

export default styles;
