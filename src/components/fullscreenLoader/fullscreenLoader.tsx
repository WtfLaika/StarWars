import {
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React from 'react';
import {height, width} from '../../constants/dimensions';
import {COLORS} from '../../constants/colors';

const FullScreenLoader = ({style}: {style?: StyleProp<ViewStyle>}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={'small'} color={COLORS.black} />
    </View>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
