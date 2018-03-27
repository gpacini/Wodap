import React, {Component} from 'react';
import {View, Text, TextInput,
  AsyncStorage, FlatList, Dimensions, Button, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback} from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import {FormLabel, FormInput, ListItem} from 'react-native-elements';
import MainView from './MainView';

const styles = require("../Styles/Styles");

export default class DailyDrink extends Component{

  state={
    intake: 2,
    today: [],
    currentIntake: "",
  };

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.onRef(this)
    this.loadDailyIntake();
    this.loadTodayValues();
  }

  forceUpdate(){
    this.loadDailyIntake();
  }

  loadDailyIntake = async () => {
    await AsyncStorage.getItem('intake', (err, result) => {
      if( result !== null ){
        this.setState({intake:result});
      }
    });
  }


  saveTodaysIntake = async () => {
    let today = this.state.today;
    try{
      await AsyncStorage.setItem(this.createDate(), JSON.stringify(today));
    } catch(error){
      console.log("Error saving data: " + error);
    }
  }

  createDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getYear();
    return `${day}-${month}-${year}`;
  }

  createTime(){
    let date = new Date();
    let minute = date.getMinutes();
    let hour = date.getHours();
    return `${hour}:${minute}`;
  }

  loadTodayValues = async() => {
    await AsyncStorage.getItem(this.createDate(), (err, result) => {
      let values = JSON.parse(result);
      if( values !== null ){
        this.setState({today:values});
      }
    });
  }

  addValue(){
    let time = this.createTime();
    let int = {time:time, intake:Number(this.state.currentIntake)};
    let today = this.state.today;
    today.push(int);
    this.setState({today:today, currentIntake:""});
    this.saveTodaysIntake();
  }

  renderItem = ({item}) => {
    return(
      <ListItem title={item.intake} subtitle={item.time}  hideChevron />
    );
  }

  render(){
    let score = 0;
    this.state.today.map((v,i) => {
      score+= v.intake;
    });
    let percentage = (score/1000) / this.state.intake * 100;
    if( percentage > 100 ){
      alert("¡Felicitaciones!¡Cumpliste tu meta del día!")
    }
    return(
      <MainView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.titleText}>Tomado en el día</Text>
            <View style={{paddingLeft:75, paddingRight:75}}>
            <AnimatedCircularProgress
              size={width-150}
              width={35}
              fill={percentage}
              tintColor="#00e0ff"
              backgroundColor="#3d5875" >
              {
                (fill) => (
                  <Text style={{fontSize:30}}>
                    {score} mL
                  </Text>
                )
              }
            </AnimatedCircularProgress>
            </View>
            <Text style={styles.titleText}>Recomendado: {this.state.intake * 1000} mL </Text>
            <FormLabel>Agregar Toma (mL)</FormLabel>
            <FormInput
              keyboardType={'numeric'}
              value={this.state.currentIntake}
              onChangeText={(text) => {
                this.setState({currentIntake:text});
              }}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={()=>{this.addValue(); Keyboard.dismiss();}}>
          <View style={{alignItems:'center', marginTop:15}}>
            <Image source={require("../assets/agregar.png")} style={{width:190, height:50}} />
          </View>
        </TouchableOpacity>
        <FlatList
          data={this.state.today}
          extraData={this.state}
          renderItem={this.renderItem}
          keyExtractor={(item,index)=>{return item.time+index}} />
      </MainView>
    );
  }

}


  const {width} = Dimensions.get("window");
