import React, { Component } from 'react'
//import {setLocalNotification,btnWidth,clearLocalNotifications} from "../utils/helper";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";

class NewDeck extends Component {
  state = {
    text: "",
    errorMessage: "",
    color: teal
  };

  onInputChange = text =>
    this.setState({ text, errorMessage: ""});

  handleSubmit = () => {
    if (this.state.text !== "") {
      const newDeck = {
        [this.state.text]: { title: this.state.text, questions: [] }
      };
      this.props.addDeck(newDeck);
      console.log(newDeck[this.state.text]);
      this.props.navigation.navigate("Deck", {
        deck: newDeck[this.state.text]
      });
      this.setState({
        text: ""
      });
    } else {
      this.setState({
        errorMessage: "Error occurs in your code",
        color:'#FF0000'
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.text}
          placeholder="Set the deck Title"
          onChangeText={this.onInputChange}
        />
        <View>
          <Text>{this.state.errorMessage}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.handleSubmit()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    title:{
        fontSize:13,
        textAlign:'center'
    },
    buttonText:{
        align:'center'
    },
    button:{
        size:15,
        color:"white"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100
      },
  input: {
    width: inputWidth,
    fontSize: 15,
    padding: 10,
    margin: 25
  }
});

export default connect(null, { addDeck })(NewDeck);
