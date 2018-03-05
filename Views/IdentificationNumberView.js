import React, {Component} from 'react';
import {Button, View, TextInput, Text, Image, TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView, Keyboard} from 'react-native';
import {identificationAlgorithm} from "../Classes/IdentificationAlgorithm";

const styles = require("../Styles/Styles.js");

const logoDimensions = {
  width: 928,
  height: 469,
}
const win = Dimensions.get('window');

const initialWidth = (win.width - 100)/1.5;
const ratio = initialWidth/logoDimensions.width;
const initialHeight = logoDimensions.height * ratio;

const initialPadding = (win.height/2) - 150;

export default class IdentificationNumberView extends Component {

  constructor(props){
    super(props);
    this.state = {currentNumber: 0, showValidationText : false};
    this.keyboardHeight = new Animated.Value(initialPadding);
  }

  validate(){
    var valid = identificationAlgorithm.identifyNumber(this.state.currentNumber);
    if( valid ){
        this.props.onValidated();
    } else {
        this.setState({showValidationText: true});
    }
  }

  componentDidMount () {
   this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
   this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
 }

 componentDidUnmount() {
   this.keyboardWillShowSub.remove();
   this.keyboardWillHideSub.remove();
 }

 keyboardWillShow = (event) => {
     Animated.timing(this.keyboardHeight, {
       duration: event.duration,
       toValue: initialPadding - event.endCoordinates.height/2,
     }).start();
 }

 keyboardWillHide = (event) => {
     Animated.timing(this.keyboardHeight, {
       duration: event.duration,
       toValue: initialPadding,
     }).start();
 }

  render(){
    return (
      <KeyboardAvoidingView style={[styles.mainApp, {backgroundColor:'#bee1fc'}]}>
        <Animated.View style={[styles.flexColumn,{paddingTop:this.keyboardHeight}]} >
          <View style={{alignItems:'center'}}>
            <Image style={{height:initialHeight, width:initialWidth, margin:10}} source={require('../assets/logo.png')} />
          </View>
          <Text style={styles.bodyText}>
            Para continuar por favor ingresa el código que
            vino en tu Wodap JA.
          </Text>
          <TextInput
            autofocus={true}
            style={styles.input}
            keyboardType='numeric'
            onChangeText={(text) => this.setState({currentNumber: text})} />
          <TouchableOpacity
            style={{alignItems:'center'}}
            onPress={()=> this.validate()}
            >
            <Image source={require("../assets/validar.png")} style={{width:190, height:50}} />
          </TouchableOpacity>
          <Text
            style={[styles.bodyText,{color:'red'}]}>
            {this.state.showValidationText ? "El código ingresado no es válido." : ""}
          </Text>
        </Animated.View>
      </KeyboardAvoidingView>
    )
  }
}
