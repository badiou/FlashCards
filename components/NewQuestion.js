import React, { Component } from 'react'
import { connect } from 'react-redux'
import {setLocalNotification,btnWidth,clearLocalNotifications} from "../utils/helper";
import {
  StyleSheet, 
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from "react-native";
import { addCard } from "../actions"

class NewQuestion extends Component {
  state = {
    question: "",
    answer: "",
    errorMessageQ: "",
    errorMessageA: "",
  };

  onInputQuestion = question =>
    this.setState({ question, errorMessageQ: "", colorQ: teal });

  onInputAnswer = answer =>
    this.setState({ answer, errorMessageA: "", colorA: teal });

  handleSubmit = () => {
    if (this.state.question !== "" && this.state.answer !== "") {
      const { deck } = this.props.navigation.state.params;
      const updatedDeck = {
        [deck.title]: {
          title: deck.title,
          questions: [
            {
              question: this.state.question,
              answer: this.state.answer
            },
            ...deck.questions
          ]
        }
      };

      this.props.addCard(updatedDeck);
      this.props.navigation.navigate("Deck", {
        deck
      });
      this.setState({
        question: "",
        answer: ""
      });
    } else if (this.state.question === "" && this.state.answer === "") {
      this.setState({
        errorMessageA: "Please set an awswer!",
        errorMessageQ: "Please set a question",
        colorQ: red,
        colorQ: '#FF0000'
      });
    } else if (this.state.answer == "") {
      this.setState({
        errorMessageA: "Please set an awswer!",
        colorQ: '#FF0000'
      });
    } else {
      this.setState({
        errorMessageQ: "Please set a question",
        colorQ: '#FF0000'
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.onInputQuestion}
          style={styles.input}
          placeholder="The question"
          underlineColorAndroid={this.state.colorQ}
        />
        <View>
          <Text style={styles.errorMessage}>{this.state.errorMessageQ}</Text>
        </View>
        <TextInput
          onChangeText={this.onInputAnswer}
          style={styles.input}
          placeholder="The answer"
          underlineColorAndroid={this.state.colorA}
        />
        <View>
          <Text style={styles.errorMessage}>{this.state.errorMessageA}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  btn: {
    padding: 10,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "teal",
    width: btnWidth
  },
  btnText: {
    textAlign: "center"
  },
  input: {
    width: inputWidth,
    fontSize: 15,
    padding: 10,
    margin: 25
  },
  errorMessage: {
    color: red,
    textAlign: "center"
  }
});

export default connect(null, { addCard })(NewQuestion);
