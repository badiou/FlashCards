import React, { Component } from "react";
import {TouchableOpacity, StyleSheet,Text,View,Animated,} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {setLocalNotification,btnWidth,clearLocalNotifications} from "../utils/helper";

class Quiz extends Component {
  state = {
    selectedQuestion: 0,
    showAnswer: false,
    correctAnswers: 0
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }

  componentWillUnmount() {
    this.animatedValue.removeAllListeners();
  }

  handleClick = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    }
  };
  correctAnswers = () => {
    this.setState({
      correctAnswers: this.state.correctAnswers + 1
    });
    this.nextQuestion();
  };
  nextQuestion = () => {
    this.setState({
      selectedQuestion: this.state.selectedQuestion + 1,
      showAnswer: false
    });
    this.animatedValue.setValue(0);
    const { deck } = this.props.navigation.state.params;
    if (deck.questions.length - 1 <= this.state.selectedQuestion) {
      clearLocalNotifications().then(setLocalNotification());
    }
  };
  reset = () => {
    this.setState({
      selectedQuestion: 0,
      correctAnswers: 0
    });
  };
  render() {
    const { deck } = this.props.navigation.state.params;
    const frontAnimatedStyle = {
      opacity: this.frontOpacity,
      transform: [{ rotateY: this.frontInterpolate }]
    };
    const backAnimatedStyle = {
      opacity: this.backOpacity,
      transform: [{ rotateY: this.backInterpolate }]
    };
    return (
      <View style={styles.container}>
      
        {this.state.selectedQuestion + 1 <= deck.questions.length && (
          <View style={styles.questionCount}>
            <Text>
              {this.state.selectedQuestion + 1}/{deck.questions.length}
            </Text>
          </View>
        )}

        <View style={styles.container}>
     
          {deck.questions.length === 0 && (
            <View>
              <View style={styles.shadow}>
                <Text style={styles.title}>
                  Please add the questions
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("DeckView", {
                    deck
                  })
                }
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Go Back</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
         
          {deck.questions.length > 0 &&
          deck.questions.length <= this.state.selectedQuestion ? (
            <View>
              <Text style={styles.correct}>
               
                {`You answered ${this.state.correctAnswers} out of ${
                  deck.questions.length
                } questions correctly`}.
              </Text>
              
              <Text style={styles.score}>
                {`Your Score: ${(
                  this.state.correctAnswers /
                  deck.questions.length *
                  100
                ).toFixed(0)}%`}
              </Text>
              {this.state.correctAnswers / deck.questions.length < 0.6 && (
                <View>
                  <Text style={styles.message}>
                    You need some more practice!
                  </Text>
                  <Entypo
                    style={styles.icon}
                    name="emoji-sad"
                    size={50}
                    color={red}
                  />
                </View>
              )}
              {this.state.correctAnswers / deck.questions.length > 0.8 &&
                this.state.correctAnswers / deck.questions.length < 1 && (
                  <View>
                    <Text style={styles.message}>Well done!</Text>
                    <Entypo
                      style={styles.icon}
                      name="emoji-happy"
                      size={50}
                    />
                  </View>
                )}

              {this.state.correctAnswers / deck.questions.length === 1 && (
                <View>
                  <Text style={styles.message}>
                    Well done, you master all the material!
                  </Text>
                  <Entypo
                    style={styles.icon}
                    name="emoji-happy"
                    size={50}
                    color={teal}
                  />
                </View>
              )}

              <TouchableOpacity onPress={() => this.reset()}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Restart Quiz</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("DeckView", {
                    deck
                  })
                }
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Back</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            deck.questions
              .filter((question, i) => i === this.state.selectedQuestion)
              .map(question => (
                <View key={question.question}>
                  {!this.state.showAnswer ? (
                    <Animated.View style={[styles.shadow, frontAnimatedStyle]}>
                      <Text style={styles.title}>{question.question}</Text>
                      <TouchableOpacity onPress={() => this.handleClick()}>
                        <View>
                          <Text style={styles.text}>Show the answer to the question</Text>
                        </View>
                      </TouchableOpacity>
                    </Animated.View>
                  ) : (
                    <Animated.View
                      style={backAnimatedStyle}
                    >
                      <Text style={styles.title}>{question.answer}</Text>
                      <TouchableOpacity onPress={() => this.handleClick()}>
                        <View>
                          <Text style={styles.text}>Show the question question</Text>
                        </View>
                      </TouchableOpacity>
                    </Animated.View>
                  )}
                  <TouchableOpacity onPress={() => this.correctAnswers()}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Correct</Text>
                    </View>
                  </TouchableOpacity>
                
                  <TouchableOpacity onPress={() => this.nextQuestion()}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Incorrect</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
          )}
        </View>
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
  score: {
    fontSize: 25,
    textAlign: "center",
    padding: 10
  },
  correct: {
    fontSize: 18,
    textAlign: "center"
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 5,
  },

  questionCount: {
    flex: -1,
    justifyContent: "flex-start",
    alignSelf: "flex-start"
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    padding: 10,
  },
  btn: {
    width: btnWidth,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 16,
    borderRadius: 2,
    borderWidth: 2
  },
  btnText: {
    fontSize: 16,
    textAlign: "center"
  },
  message: {
    textAlign: "center",
    fontSize: 18
  },
  icon: {
    textAlign: "center",
    fontSize: 50,
    marginTop: 10
  }
});

export default Quiz;
