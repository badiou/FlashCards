import { Dimensions } from "react-native";
import { Notifications, Permissions } from "expo";
import { AsyncStorage } from '@react-native-community/async-storage'
//import { AsyncStorage, } from 'react-native'
export const { width } = Dimensions.get("window");
export const btnWidth = width - 50;
export const inputWidth = width - 20;

const NOTIFICATION_KEY = "FLASHCARDSMOBILE:notifications";

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Flash cards, let go to pratice",
    body: "It can help you to know many things ! ",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
