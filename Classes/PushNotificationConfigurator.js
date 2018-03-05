import { PushNotificationIOS } from 'react-native';

const PushNotification = require("react-native-push-notification");

export default class PushNotificationConfigurator {
  constructor(){
    PushNotification.configure({

      onNotification: function(notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  addScheduledNotification(hour, minutes, name = ''){
    var now = new Date(Date.now());
    var modifiedDate = new Date(Date.now());
    modifiedDate.setMinutes(minutes);
    modifiedDate.setHours(hour);

    if( now.getTime() > modifiedDate.getTime() ){
      modifiedDate.setDate(modifiedDate.getDate() + 1);
    }

    var notification = {
      id : hour + "000" + minutes,
      message: "Es hora de beber de tu Wodap!" + (name !== '' ? ": " + name : name),
      date: modifiedDate,
      repeatType: 'day',
    };
    PushNotification.localNotificationSchedule(notification);
  }

  removeScheduledNotification(hour, minutes){
    var notification = {id : hour + "000" + minutes};
    PushNotification.cancelLocalNotifications(notification);
  }

}
