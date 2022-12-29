import React from 'react';
import {RootStackParamList, ROUTES} from '../constants/routes';
import {COLORS} from '../constants/colors';
import {forFade} from './options';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CharactersListScreen} from '../screens/CharactersList/CharactersList.screen';
import {CharacterInfoScreen} from '../screens/CharacterInfo/CharacterInfo.screen';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.CHARACTERS_LIST}
        screenOptions={{
          headerMode: 'screen',
          presentation: 'card',
          keyboardHandlingEnabled: false,
          cardStyle: {backgroundColor: COLORS.veryLightGrey},
        }}>
        <Stack.Screen
          name={ROUTES.CHARACTERS_LIST}
          component={CharactersListScreen}
          options={{headerShown: false, cardStyleInterpolator: forFade}}
        />
        <Stack.Screen
          name={ROUTES.CHARACTER_INFO}
          component={CharacterInfoScreen}
          options={{
            headerShown: true,
            title: 'Character Info',
            cardStyleInterpolator: forFade,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
