import React, { Component } from 'react';
import { connect } from 'react-redux';
//import {setLocalNotification,btnWidth,clearLocalNotifications} from "../utils/helper";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { getAllDecks } from "../actions";

class DeckView extends Component {
  componentDidMount() {
    this.props.getDecks;
  }

  render() {
    const { title } = this.props.navigation.state.params.deck;
    const deck = this.props.decks[title];
    if (!deck) {
      return null;
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cardCount}>{`${
            deck.questions.length
          } cards`}</Text>

          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("NewQuestionView", { deck })
            }
            style={styles.btn}
          >
            <Text style={styles.btnText}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("QuizView", { deck })}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  title: {
    fontSize: 18,
    textAlign: "center"
  },
  btnText: {
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  decks: state
});

export default connect(mapStateToProps, { getAllDecks })(DeckView);
