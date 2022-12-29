import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {Charachter} from '../../redux/character.slice';
import {ROUTES} from '../../constants/routes';

interface ICharacterRow {
  character: Charachter;
  icon?: React.ReactNode;
  isPressable?: boolean;
  onIconPress?: () => void;
}

export const CharacterRow = ({
  icon,
  character,
  onIconPress,
  isPressable,
}: ICharacterRow) => {
  const {navigate} = useNavigation();
  const onPress = () => {
    navigate(ROUTES.CHARACTER_INFO, {character});
  };
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!isPressable}
      onPress={onPress}>
      <Pressable
        style={({pressed}) => [
          styles.iconContainer,
          {opacity: pressed ? 0.5 : 1},
        ]}
        onPress={onIconPress}
        hitSlop={10}>
        {icon}
      </Pressable>
      <View />
      <View style={styles.nameContainer}>
        <Text style={styles.textStyle}>{character.name}</Text>
      </View>
      <View style={styles.genderContainer}>
        <Text style={styles.textStyle}>{character.gender}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    borderColor: COLORS.grey2,
    borderBottomWidth: 1,
    padding: 10,
  },
  iconContainer: {
    width: '10%',
  },
  nameContainer: {width: '50%'},
  genderContainer: {width: '30%'},
  textStyle: {
    fontSize: 16,
    color: COLORS.black,
    width: '100%',
    textAlign: 'center',
  },
});
