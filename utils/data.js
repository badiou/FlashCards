import {AsyncStorage} from '@react-native-community/async-storage'
import {MY_DECK_STORAGE} from './api'

export function ourJsonData(){
let data={
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        },
        JavaScript: {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
          ]
        }
      }

      AsyncStorage.setItem(MY_DECK_STORAGE,JSON.stringify({data}))
      return data;
}