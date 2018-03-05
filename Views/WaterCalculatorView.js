import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TextInput, Platform,
  TouchableOpacity, Keyboard, TouchableWithoutFeedback, Animated, Image } from 'react-native';
import { Picker } from 'react-native-picker-dropdown';
import { Picker  as AndroidPicker } from 'react-native';
import { WaterCalculator } from '../Classes/WaterCalculator';
import NavigationBar from 'navigationbar-react-native';
import MainView from './MainView';


const styles = require("../Styles/Styles.js");

const initialInfoHeight = 0;
const finalInfoHeight = 200;

export default class WaterCalculatorView extends Component {

  infoIsShowing = false;

  componentRight = () => {
    return(
      <View style={{ flex: 1, alignItems: 'flex-end', width:24, height:24 }}>
        <TouchableOpacity onPress={this.onInfoButtonPress}>
          <Image style={{width:24, height:24}} source={require('../assets/icons/info_button.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  iosPicker = () => {
    return(
      <Picker
        style={{padding: 5, flex:1}}
        selectedValue={this.state.units}
        textStyle = {[styles.bodyText, {textAlign:'left', paddingLeft: 0, marginLeft:0, paddingTop:7, fontWeight:'bold'}]}
        onValueChange={(itemValue, itemIndex) => this.setState({units: itemValue})}>
        <Picker.Item label="Kilos" value='kg' />
        <Picker.Item label="Libras" value='lb' />
      </Picker>
    );
  }

  androidPicker = () => {
    return(
      <AndroidPicker
        style={{width:120, height:30, borderBottomColor:'lightgray', borderBottomWidth:1}}
        mode='dialog'
        selectedValue={this.state.units}
        itemStyle = {[ {color:'black'}]}
        onValueChange={(itemValue, itemIndex) => this.setState({units: itemValue})}>
        <AndroidPicker.Item label="Kilos" value='kg' />
        <AndroidPicker.Item label="Libras" value='lb'  />
      </AndroidPicker>
    );
  }

  currentPicker = Platform.OS === 'ios' ? this.iosPicker : this.androidPicker;

  constructor(props){
    super(props);
    this.state = {weight : 0, excercise : 0, units : 'kg', intake: 0, showIntake : false};
    this.calculator = new WaterCalculator();
    this.infoViewHeight = new Animated.Value(initialInfoHeight);
    this.infoViewOpacity = new Animated.Value(0);
  }

  showInfoBox = () =>{
    this.infoIsShowing = true;
    Animated.parallel([
    Animated.timing(this.infoViewHeight,
    {
      duration: 500,
      toValue: finalInfoHeight,
    }),
    Animated.timing(this.infoViewOpacity,{
      duration: 500,
      toValue: 1,
    })]).start();
  }

  hideInfoBox = () => {
    this.infoIsShowing = false;
    Animated.parallel([
    Animated.timing(this.infoViewHeight,
    {
      duration: 500,
      toValue: initialInfoHeight,
    }),
    Animated.timing(this.infoViewOpacity,{
      duration: 500,
      toValue: 0,
    })]).start();
  }

  onInfoButtonPress = () => {
    if( this.infoIsShowing ){
      this.hideInfoBox();
    } else {
      this.showInfoBox();
    }
  }

  calculate(){
    this.calculator.setValues(this.state.weight, this.state.units, this.state.excercise);
    this.calculator.calculate();
    this.setState({intake: this.calculator.getIntake(), showIntake: true});
  }

  render(){
    let intake = this.state.showIntake ? this.state.intake + " litros al día" : '';
    return (
      <MainView
        componentRight={this.componentRight } >
      <Animated.View style = {{height:this.infoViewHeight, backgroundColor:'#bee1fc', opacity: this.infoViewOpacity}} >
        <Text style={styles.bodyText}>{`Los médicos recomiendan tomar alrededor de 2 litros de agua al día. En realidad esto depende de tu peso y la cantidad de ejercicio que realices.\n
        Para saber con exactitud cuánta agua deberías tomar al día, ingresa tus datos a continuación.`}
        </Text>
      </Animated.View>
      <View style={[styles.container]} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <View style={[styles.flexRow, {borderBottomWidth:1, borderBottomColor:'gray'}]}>
            <Text style={[styles.bodyText, {flex:1, textAlign: 'left',}]}>Peso:</Text>
            <TextInput
              style={[styles.bodyText, {textAlign:'left', flex:1, fontWeight:'bold'}]}
              placeholder = "Kilogramos o Libras"
              keyboardType='numeric'
              onChangeText={(text) => this.setState({weight: text})} />
          </View>
            <View style={[styles.flexRow, {borderBottomWidth:1, borderBottomColor:'gray'}]}>
            <Text style={[styles.bodyText, {textAlign:'left', flex:1}]}>Unidades:</Text>
            {this.currentPicker()}
          </View>
            <View style={[styles.flexRow, {borderBottomWidth:1, borderBottomColor:'gray'}]}>
          <Text
            style={[styles.bodyText, {textAlign:'left', flex:1}]}>Ejercicio:</Text>
            <TextInput
              style={[styles.bodyText, {textAlign:'left', flex:1, fontWeight:'bold'}]}
              placeholder = "Minutos"
              keyboardType='numeric'
              onChangeText={(text) => this.setState({excercise: text})} />
            </View>
          <TouchableOpacity
            style={{alignItems:'center', marginTop:20}}
            onPress={() => {
            this.calculate()
            Keyboard.dismiss();
          }}>
            <Image source={require("../assets/calcular.png")} style={{width:190, height:50}} />
          </TouchableOpacity>
          <Text style={{fontSize:50, textAlign:'center', marginTop:40}}>{intake}</Text>
        </View>
      </TouchableWithoutFeedback>
      </View>
      </MainView>
    );
  };
};
