import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import Search from '../../assets/search.svg';

type Props = {
  value: string;
  onValueChange: (v: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
};

const SearchBar: React.FC<Props> = ({
  value,
  onValueChange,
  placeholder,
  placeholderTextColor = COLORS.lightGrey,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Search />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onValueChange}
        autoCorrect={true}
        keyboardType="default"
        spellCheck={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  leftContainer: {
    justifyContent: 'center',
    marginRight: 10,
  },

  input: {
    fontSize: 15,
    flex: 1,
    fontWeight: '400',
    height: 43,
  },
});

export default SearchBar;
