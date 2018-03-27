import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TextInput, Platform, AsyncStorage,
  TouchableOpacity, Keyboard, TouchableWithoutFeedback, Animated, Image } from 'react-native';
import { Picker } from '../Modules/react-native-picker-dropdown/index';
import { Picker  as AndroidPicker } from 'react-native';
import { WaterCalculator } from '../Classes/WaterCalculator';
import NavigationBar from '../Modules/navigationbar-react-native/index';
import MainView from './MainView';


const styles = require("../Styles/Styles.js");

const initialInfoHeight = 0;
const finalInfoHeight = 200;

const {width, height} = Dimensions.get("window");

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
        style={{flex:1, height:30, borderBottomColor:'lightgray', borderBottomWidth:1, margin:0, padding:0}}
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
    this.state = {weight : "", excercise : "", units : 'kg', intake: "", showIntake : false};
    this.calculator = new WaterCalculator();
    this.infoViewHeight = new Animated.Value(initialInfoHeight);
    this.infoViewOpacity = new Animated.Value(0);
    this.calculatorHeight = new Animated.Value(height*5/6);
    this.calculatorOpacity = new Animated.Value(1);
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

    this.hideCalculator();
  }

  hideCalculator = () => {
    Animated.parallel([
      Animated.timing(this.calculatorHeight,
      {
        toValue:0,
        duration:500
      }),
      Animated.timing(this.calculatorOpacity,{
        duration: 500,
        toValue: 0,
      })]).start();
  }

  showCalculator = () => {
    Animated.parallel([
      Animated.timing(this.calculatorHeight,
      {
        toValue:height*5/6,
        duration:500
      }),
      Animated.timing(this.calculatorOpacity,{
        duration: 500,
        toValue: 1,
      })]).start();
  }

  resetEverything = () => {
    this.showCalculator();
    this.setState({
      weight : "", excercise : "", units : 'kg', intake: "", showIntake : false
    });
  }

  saveAsBest = async () => {
    let intake = this.state.intake;
    alert("¡Tu valor diario a tomar ahora es de: " + this.state.intake +" litros!");
    try{
      await AsyncStorage.setItem('intake', intake);
    } catch(error){
      console.log("Error saving data: " + error);
    }
  }

  render(){
    let intake = this.state.showIntake ? this.state.intake + " litros al día" : '';
    let saveButton = this.state.showIntake ?
      <TouchableOpacity
        style={{alignItems:'center', marginTop:10}} onPress={() => this.saveAsBest()}><Image source={require("../assets/guardar.png")} style={{width:190, height:50}} /></TouchableOpacity> : <View></View>;
    let resetButton = this.state.showIntake ?
      <TouchableOpacity
        style={{alignItems:'center', marginTop:10}} onPress={() => this.resetEverything()}><Image source={require("../assets/reset.png")} style={{width:190, height:50}} /></TouchableOpacity> : <View></View>;
    return (
      <MainView
        componentRight={this.componentRight } >
      <Animated.View style = {{height:this.infoViewHeight, backgroundColor:'#bee1fc', opacity: this.infoViewOpacity}} >
        <Text style={styles.bodyText}>{`Los médicos recomiendan tomar alrededor de 2 litros de agua al día. En realidad esto depende de tu peso y la cantidad de ejercicio que realices.\n
        Para saber con exactitud cuánta agua deberías tomar al día, ingresa tus datos a continuación.`}
        </Text>
      </Animated.View>
      <View style={[styles.container]} >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
        <View>
          <Animated.View style={{height:this.calculatorHeight, opacity: this.calculatorOpacity}} >
            <View style={[styles.flexRow, {borderBottomWidth:1, borderBottomColor:'gray'}]}>
              <Text style={[styles.bodyText, {flex:1, textAlign: 'left',}]}>Peso:</Text>
              <TextInput
                style={[styles.bodyText, {textAlign:'left', flex:1, fontWeight:'bold'}]}
                placeholder = "Kilogramos o Libras"
                keyboardType='numeric'
                value={this.state.weight+""}
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
                value={this.state.excercise+""}
                onChangeText={(text) => this.setState({excercise: text})} />
              </View>
            <TouchableOpacity
              style={{alignItems:'center', marginTop:20}}
              onPress={() => {
              this.calculate();
              Keyboard.dismiss();
            }}>
              <Image source={require("../assets/calcular.png")} style={{width:190, height:50}} />
            </TouchableOpacity>
          </Animated.View>
          <Text style={{fontSize:50, textAlign:'center', marginTop:40}}>{intake}</Text>
          {saveButton}
          {resetButton}
        </View>
      </TouchableWithoutFeedback>
      </View>
      </MainView>
    );
  };
};
