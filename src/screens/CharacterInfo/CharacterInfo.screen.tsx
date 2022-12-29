import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {apiGetInfoFromUrl} from '../../api/api';
import FullScreenLoader from '../../components/fullscreenLoader/fullscreenLoader';
import {COLORS} from '../../constants/colors';
import {width} from '../../constants/dimensions';
import {RootStackParamList, ROUTES} from '../../constants/routes';

type CharacterRoute = RouteProp<RootStackParamList, ROUTES.CHARACTER_INFO>;

interface IInitialState {
  homeworld: string;
  starships: string[];
  vehicles: string[];
  films: string[];
}

const InitialState: IInitialState = {
  homeworld: '',
  starships: [],
  vehicles: [],
  films: [],
};

export const CharacterInfoScreen = () => {
  const character = useRoute<CharacterRoute>().params?.character;
  const [restCharacterInfo, setRestCharacterInfo] = useState(InitialState);
  const [loading, setLoading] = useState(false);

  const getCharacterInfo = async () => {
    try {
      setLoading(true);
      const homeworld = await apiGetInfoFromUrl(character.homeworld);
      Promise.all([
        character.starships.length
          ? await Promise.all(
              character.starships.map(async item => {
                const starship = await apiGetInfoFromUrl(item);
                return starship.name;
              }),
            )
          : [],
        character.films.length
          ? await Promise.all(
              character.films.map(async item => {
                const film = await apiGetInfoFromUrl(item);
                return film.title;
              }),
            )
          : [],
        character.vehicles.length
          ? await Promise.all(
              character.vehicles.map(async item => {
                const vehicle = await apiGetInfoFromUrl(item);
                return vehicle.name;
              }),
            )
          : [],
      ])
        .then(value =>
          setRestCharacterInfo(s => ({
            ...s,
            homeworld: homeworld.name,
            starships: value[0],
            films: value[1],
            vehicles: value[2],
          })),
        )
        .catch(e => {
          throw e;
        });
    } catch (e) {
      console.log('getCharacterInfo', e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCharacterInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.field}>Birth year: {character.birth_year}</Text>
      <Text style={styles.field}>Gender: {character.gender}</Text>
      <Text style={styles.field}>Hair Color: {character.hair_color}</Text>
      <Text style={styles.field}>Skin Color: {character.skin_color}</Text>
      <Text style={styles.field}>Eye Color: {character.eye_color}</Text>
      <Text style={styles.field}>Homeworld: {restCharacterInfo.homeworld}</Text>
      <Text style={styles.field}>Height : {character.height}</Text>
      <Text style={styles.field}>Mass : {character.mass}</Text>
      <Text style={styles.field}>
        Firms :{' '}
        {restCharacterInfo.films.length
          ? restCharacterInfo.films.map(item => item).join(', ')
          : 'none'}
      </Text>
      <Text style={styles.field}>
        Vehicles :{' '}
        {restCharacterInfo.vehicles.length
          ? restCharacterInfo.vehicles.map(item => item).join(', ')
          : 'none'}
      </Text>
      <Text style={styles.field}>
        Vehicles :{' '}
        {restCharacterInfo.starships.length
          ? restCharacterInfo.starships.map(item => item).join(', ')
          : 'none'}
      </Text>
      {loading && <FullScreenLoader style={styles.loader} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  name: {fontSize: 30, alignSelf: 'center', textAlign: 'center'},
  field: {fontSize: 20, marginTop: 20},
  loader: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginTop: '75%',
  },
});
