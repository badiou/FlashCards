export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK='REMOVE_DECK'
export const RECEIVE_ALL_DECK='RECEIVE_ALL_DECK'
export const GET_DECK='GET_DECK'
import * as api from "../utils/api";

export function getAllDecks(decks) {
  return {
    type: GET_DECK,
    decks
  };
}

export const fetchDecks = () => dispatch =>
  api.getAllDecks().then(decks => dispatch(getAllDecks(decks)));

export function addNewDeck(decks) {
  return {
    type: ADD_DECK,
    decks
  };
}

export const addDeck = data => dispatch =>
  api.addDeck(data).then(decks => dispatch(addNewDeck(decks)));

export function addNewCard(decks) {
  return {
    type: ADD_CARD,
    decks
  };
}

export const addCard = data => dispatch =>
  api.addCard(data).then(decks => dispatch(addNewCard(decks)));
