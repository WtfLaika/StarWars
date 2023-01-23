import React from 'react';
import {RootStackParamList, ROUTES} from '../constants/routes';
import {COLORS} from '../constants/colors';
import {forFade} from './options';
import {createStackNavigator} from '@react-navigation/stack';
import {CharactersListScreen} from '../screens/CharactersList/CharactersList.screen';
import {CharacterInfoScreen} from '../screens/CharacterInfo/CharacterInfo.screen';

const {Screen, Navigator} = createStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <Navigator
      initialRouteName={ROUTES.CHARACTERS_LIST}
      screenOptions={{
        headerMode: 'screen',
        presentation: 'card',
        keyboardHandlingEnabled: false,
        cardStyle: {backgroundColor: COLORS.veryLightGrey},
      }}>
      <Screen
        name={ROUTES.CHARACTERS_LIST}
        component={CharactersListScreen}
        options={{headerShown: false, cardStyleInterpolator: forFade}}
      />
      <Screen
        name={ROUTES.CHARACTER_INFO}
        component={CharacterInfoScreen}
        options={{
          headerShown: true,
          title: 'Character Info',
          cardStyleInterpolator: forFade,
        }}
      />
    </Navigator>
  );
};

export default MainNavigation;
