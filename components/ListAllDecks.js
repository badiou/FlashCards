import React,{Component} from 'react'
import {View,Text,FlatList,TouchableOpacity,StyleSheet} from 'react-native'
import {fetchAllDecks} from '../actions'
import { connect } from 'react-redux'
//import {setLocalNotification,btnWidth,clearLocalNotifications} from "../utils/helper";

class ListAllDecks extends Component{
componentDidMount(){
    this.props.fetchAllDecks()
}
showOneItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("DeckView", {
              deck: item
            })
          }
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.cardCount}>{`${
            item.questions.length
          } cards`}</Text>
        </TouchableOpacity>
      </View>
    );
  };
    render(){
        return(
        <View style={styles.container}>
                {this.props.decks &&
                Object.keys(this.props.decks).length === 0 && (
                    <View>
                    <Text style={styles.title}>
                       The list of deck is empty. 
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("NewDeck")}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Add new Deck</Text>
                    </TouchableOpacity>
                    </View>
                )}

                <FlatList
                renderItem={this.showOneItem}
                data={this.props.decks && Object.values(this.props.decks)}
                keyExtractor={(item, index) => item.title}
        />
        </View>)
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
      }
})

const mapStateToProps = state => ({
    decks: state
  })
  
export default connect(mapStateToProps,{ fetchAllDecks })(ListAllDecks);