import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {FanCard} from '../../components/fanCard/FanCard.component';
import {debounce} from 'lodash';
import {SafeAreaView} from 'react-native-safe-area-context';
import {width} from '../../constants/dimensions';
import SearchBar from '../../components/searchBar/searchBar.component';
import {
  Charachter,
  getCharachters,
  removeFavoriteCharacter,
  addFavoriteCharacter,
  increaseFansAmount,
  decreaseFansAmount,
  resetFans,
} from '../../redux/character.slice';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {CharacterRow} from '../../components/characterRow/characterRow.component';
import FullScreenLoader from '../../components/fullscreenLoader/fullscreenLoader';
import Heart from '../../assets/heart.svg';
import {apiSearchCharachters} from '../../api/api';
import {TouchableOpacity} from 'react-native-gesture-handler';

const initialState = {
  searchValue: '',
  searchedResult: [],
  loading: false,
};

const ITEM_HEIGHT = 41;

export const CharactersListScreen = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState(initialState);
  const {
    characters,
    hasNextPage,
    favoriteCharacters,
    maleFansAmount,
    femaleFansAmount,
    otherFansAmount,
  } = useAppSelector(s => s.character);

  const setLoading = useCallback(
    (isLoading: boolean) => {
      setState(s => ({...s, loading: isLoading}));
    },
    [state.loading],
  );

  const getSearchResult = useCallback(
    debounce(async (value: string) => {
      if (value) {
        const results = await apiSearchCharachters(value);
        setState(s => ({...s, searchedResult: results}));
      }
    }, 100),
    [state.searchedResult],
  );

  const onChangeInputValue = useCallback(
    (value: string) => {
      setState(s => ({...s, searchValue: value}));
      getSearchResult(value);
    },
    [state.searchValue, state.searchedResult],
  );

  const onScrollBeginDrag = useCallback(() => Keyboard.dismiss(), []);

  useEffect(() => {
    if (!!characters && characters.length) {
      return;
    }
    setLoading(true);
    dispatch(
      getCharachters(true, () => setTimeout(() => setLoading(false), 500)),
    );
  }, []);

  const nextPage = useCallback(async () => {
    if (!hasNextPage || state.loading || !!state.searchValue) {
      return;
    }
    dispatch(getCharachters());
  }, [hasNextPage, state.loading, state.searchValue]);

  const onReset = useCallback(() => {
    dispatch(resetFans());
  }, []);

  const likeHandler = useCallback(
    (item: Charachter) => {
      if (!favoriteCharacters.includes(item.name)) {
        dispatch(addFavoriteCharacter(item.name));
        return dispatch(increaseFansAmount(item.gender));
      }
      dispatch(removeFavoriteCharacter(item.name));

      dispatch(decreaseFansAmount(item.gender));
    },
    [favoriteCharacters],
  );

  const HeaderComponent = () => (
    <CharacterRow
      icon={
        <Heart
          height={20}
          width={20}
          stroke={COLORS.black}
          fill={COLORS.black}
        />
      }
      character={{name: 'name', gender: 'Gender'}}
    />
  );

  const keyExtractor = (item: Charachter, index: number) =>
    `${item.name}-character-${index}`;
  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const renderItem = ({item}: ListRenderItemInfo<Charachter>) => {
    const isLiked = favoriteCharacters.includes(item.name);
    return (
      <CharacterRow
        icon={
          <Heart
            height={20}
            width={20}
            stroke={COLORS.red}
            fill={isLiked ? COLORS.red : null}
          />
        }
        character={item}
        isPressable
        onIconPress={() => likeHandler(item)}
      />
    );
  };

  const EmptyComponent = (
    <View style={styles.emptyComponent}>
      <Text>No result found</Text>
    </View>
  );

  const ListFooterComponent = () =>
    characters.length >= 10 && hasNextPage && !state.searchValue ? (
      <View style={styles.nextPageLoader}>
        <ActivityIndicator />
      </View>
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.fans}>Fans</Text>
        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <Text style={{color: COLORS.red}}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gendersContainer}>
        <FanCard amount={femaleFansAmount} subtitle={'Female Fans'} />
        <FanCard amount={maleFansAmount} subtitle={'Male Fans'} />
        <FanCard amount={otherFansAmount} subtitle={'Others'} />
      </View>
      <View style={styles.searchContainer}>
        <SearchBar
          value={state.searchValue}
          onValueChange={onChangeInputValue}
          placeholder={'Search'}
        />
        <FlatList
          style={styles.flatLiscontainer}
          onEndReached={nextPage}
          onScrollBeginDrag={onScrollBeginDrag}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={HeaderComponent}
          ListEmptyComponent={EmptyComponent}
          renderItem={renderItem}
          data={state.searchValue ? state.searchedResult : characters}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
          getItemLayout={getItemLayout}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
      {state.loading && <FullScreenLoader />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: width * 0.05, paddingVertical: 20},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  flatLiscontainer: {
    borderColor: COLORS.grey2,
    borderWidth: 1,
    borderRadius: 5,
  },
  listContainer: {flexGrow: 1},
  fans: {color: COLORS.black, fontSize: 20},
  resetButton: {
    borderColor: COLORS.red,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  gendersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchContainer: {
    maxHeight: 545,
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowRadius: 5,
    borderRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: {width: 1, height: 5},
  },
  nextPageLoader: {marginVertical: 10},
  emptyComponent: {alignSelf: 'center', justifyContent: 'center', flex: 1},
});
