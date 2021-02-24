import React from 'react'
import { View, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from '@react-navigation/native'
import NewQuestion from "./NewQuestion"
import Quiz from "./Quiz"
import ListAllDecks from "./ListAllDecks"
import NewDeck from "./NewDeck"
import Deck from "./Deck"
//import {setLocalNotification,btnWidth,clearLocalNotifications} from "../utils/helper";


const Tabs = TabNavigator(
  {
    ListAllDecks: {
      screen: ListAllDecks,
      navigationOptions: {
        tabBarLabel: "All Decks"
      }
    },
    Deck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "Add a new Deck"
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      style: {
        height: 56,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: "Add a new card",
      headerTitleStyle: {
        alignSelf: "center"
      },
      headerRight: <View />,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deck.title}`,
      headerTitleStyle: {
        alignSelf: "center"
      },
      headerRight: <View />,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz",
      headerTitleStyle: {
        alignSelf: "center"
      },
      headerRight: <View />,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal
      }
    }
  },

});

export default MainNavigator;
