# Wodap
Wodap React Native pure app

# Installation

Several modules used by this app are no longer compatible with react native. In order to use them, some changes had been done, and this have to be updated in the modules folder. 

After running <code>$ npm install</code> open the terminal and run the following commands to replace the modified modules.<br /><br />
```
$ rm -rf ./node_modules/react-native-picker-android
$ rm -rf ./node_modules/react-native-tab-view
$ mkdir ./node_modules/react-native-picker-android
$ mkdir ./node_modules/react-native-tab-view
$ cp -r ./react-native-picker-android_fixed/. ./node_modules/react-native-picker-android/
$ cp -r ./react-native-tab-view_fixed/. ./node_modules/react-native-tab-view/'
```
