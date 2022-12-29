import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {width} from '../../constants/dimensions';

interface IFanCard {
  amount: number;
  subtitle: string;
}

export const FanCard = ({amount, subtitle}: IFanCard) => {
  return (
    <View style={styles.container}>
      <Text style={styles.amount}>{amount}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: width * 0.28,
    padding: 10,
    shadowColor: COLORS.black,
    shadowRadius: 5,
    borderRadius: 5,
    shadowOpacity: 0.1,

    shadowOffset: {width: 1, height: 5},
  },
  amount: {color: COLORS.black, fontSize: 20},
  subtitle: {color: COLORS.black, marginTop: 5, fontSize: 13},
});
