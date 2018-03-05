import * as React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';

const buttonColor = '#62AD45';

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  mainView : {
    paddingTop: Platform.OS === 'ios' ? 3 : 20,
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    marginBottom: 50,
    height: 40,
    backgroundColor: 'white',
  },
  mainApp : {
    flex: 1,
    justifyContent: 'center',
    flexDirection : 'row',
  },
  flexRow : {
    padding: 20,
    flexDirection : 'row',
    justifyContent: 'center',
  },
  flexColumn : {
    padding: 20,
    flexDirection : 'column',
  },
  pickerText : {
    color: 'black',
    textAlign: 'right',
  },
  waterPickerText:{
    ...Platform.select({
      ios:{
        textAlign: 'center',
        fontSize: 17,
      },
    }),
    padding: 5,
    margin: 3,
    color: 'black',
  },
  titleText : {
    ...Platform.select({
      ios:{
        textAlign: 'center',
      },
    }),
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  bodyText : {
    textAlign: 'center',
    fontSize: 17,
    padding: 5,
    margin: 3,
  },
  listText : {
    color: 'black',
    fontSize: 50,
    fontWeight: '200'
  },
  tabImage : {
    width: 32,
    height: 32,
  },
  button: {
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
    margin: 3,
    color: buttonColor,
  },
  waterCalculatorText: {
    fontSize: 17,
    padding: 5,
    margin: 3,
  },
});


module.exports = styles;
