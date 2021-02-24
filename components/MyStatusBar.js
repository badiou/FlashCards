import React from 'react'
import { View, StatusBar } from 'react-native'
import Constants from 'expo'
//import {setLocalNotification,btnWidth,clearLocalNotifications} from "../utils/helper";

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <MyStatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default MyStatusBar;
