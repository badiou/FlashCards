import { AsyncStorage } from '@react-native-community/async-storage'

const DECK_STORAGE_KEY = "FLASHCARDSMOBILE";

export const clearAll = () => {
  AsyncStorage.clear()
    .then(() => {})
    .catch(e => {
      console.log("error!");
    });
};

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => JSON.parse(data));
}

export const addDeck = newDeck =>
  AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck)).then(
    data => newDeck
  );

export const addCard = deck =>
  AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck)).then(
    data => deck
  );
