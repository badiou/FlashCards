import thunk from 'redux-thunk'
import reducer from './reducers'
import MainNavigator from './components/Navigation'
import MyStatusBar from './components/MyStatusBar'
import React from 'react-dom'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import { setLocalNotification } from './utils/helper'
import { createStore, applyMiddleware, compose } from 'redux'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <MyStatusBar
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
