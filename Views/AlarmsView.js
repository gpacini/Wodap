import React, {Component} from 'react';
import { View, AsyncStorage, Text, StatusBar, TextInput, Image,
  TouchableOpacity, Modal, Picker as PickerIOS, Button, FlatList, Platform } from 'react-native';
import NavigationBar from '../Modules/navigationbar-react-native/index';
import AlarmListItem from "./Helpers/AlarmListItem";
import MainView from "./MainView";
import PushNotificationConfigurator from "../Classes/PushNotificationConfigurator";
import PickerAndroid, {PickerAndroidItem} from '../Modules/react-native-picker-android/index';

const styles = require("../Styles/Styles.js");
const fillFunctions = require("./Helpers/Functions");
const pushNotitificationConfigurator = new PushNotificationConfigurator();

const Picker =  Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
const PickerItem = Platform.OS === 'ios' ? PickerIOS.Item : PickerAndroidItem;

export default class AlarmsView extends Component{

  state = {
    showModal: false,
    selectedHour :'0',
    selectedMinute : '0',
    selectedName: '',
    alarms : [],
  }

  minutes = [];
  hours = [];

  constructor(props){
    super(props);
    this.loadAlarms();

    for( let i = 0; i < 60; i++ ){
      this.minutes.push(i);
      if( i < 24 ){
        this.hours.push(i);
      }
    }

    fillFunctions();

  }

  //****Component Building
    //<Text style={{color: 'black', fontSize: 40}}>+</Text>

  componentRight = () => {
    return(
      <View style={{ flex: 1, alignItems: 'flex-end', width:24, height:24}}>
        <TouchableOpacity onPress={this.openAddAlarm}>
          <Image style={{width:24, height:24}} source={require('../assets/icons/add.png')} />
        </TouchableOpacity>
      </View>
    );
  }


  modalComponentLeft = () => {
    return(
      <View style={{ flex: 1, alignItems: 'flex-start', width:24, height:24}}>
        <TouchableOpacity onPress={this.closeModal}>
        <Image style={{width:24, height:24}} source={require('../assets/icons/cancel.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  modalComponentRight = () => {
    return(
      <View style={{ flex: 1, alignItems: 'flex-end', width:24, height:24 }}>
        <TouchableOpacity onPress={this.addAlarm}>
          <Image style={{width:24, height:24}} source={require('../assets/icons/save.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  //Push Notifications

  deleteNotification(alarm){
    pushNotitificationConfigurator.removeScheduledNotification(alarm.hours, alarm.minutes);
  }

  addNotification(alarm){
    pushNotitificationConfigurator.addScheduledNotification(alarm.hours, alarm.minutes, alarm.name);
  }

  //****Modal manipulation

  openAddAlarm = () => {
    this.setState({showModal : true});
  }

  closeModal = () => {
    this.setState({showModal:false});
  }

  //****Alarm managing

  addAlarm = () => {
    var key = this.state.selectedHour+"-"+this.state.selectedMinute;
    var cont = true;
    this.state.alarms.map((v,i) => {
      if( v.key == key ){
        cont = false;
      }
    });

    if( !cont ){
      alert("Ya existe esta notificación.");
      return;
    }
    var alarm = this.createAlarm(this.state.selectedHour,
                                  this.state.selectedMinute,
                                  this.state.selectedName);
    this.state.alarms.push(alarm);
    this.state.alarms.sort(this.sortAlarms);
    this.addNotification(alarm);
    this.setState({showModal:false, selectedName: ''});
    this.saveAlarms();
  }

  createAlarm(hours, minutes, name){
    var key = hours.padStart(2,'0') + "-" + minutes.padStart(2,'0');
    var time = hours.padStart(2,'0') + ":" + minutes.padStart(2,'0');
    var alarm = {
      hours : hours,
      minutes: minutes,
      on: true,
      key: key,
      text: time,
      name: name,
    }
    return alarm;
  }

  async saveAlarms(){
    var alarms = JSON.stringify(this.state.alarms);
    try {
      await AsyncStorage.setItem('alarms', alarms);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  async loadAlarms(){
    AsyncStorage.getItem('alarms', (err, result) => {
        if( result != null ){
          alarms = JSON.parse(result);
          alarms.sort(this.sortAlarms);
          this.setState({alarms : alarms});
        }
    });
  }

  sortAlarms = (a,b) => {
    return a.key.localeCompare(b.key);
  }

  //*** List Items

  toggleAlarmItem = (key) => {
    this.state.alarms.map((v,i) => {
      if( v.key == key ){
        v.on = !v.on;
        if( v.on ){
          this.addNotification(v);
        } else {
          this.deleteNotification(v);
        }
      }
    });
    this.setState({alarms: this.state.alarms});
    this.saveAlarms();
  }

  deleteAlarmItem = (key) => {
    var toDelete = -1;
    this.state.alarms.map((v,i) => {
      if( v.key == key ){
        toDelete = {value: v, key:i};
      }
    });
    if( toDelete != -1 ){
      this.deleteNotification(toDelete.value);
        this.state.alarms.splice(toDelete.key, 1);
      this.setState({alarms: this.state.alarms});
      this.saveAlarms();
    }
  }

  _renderItem = ({item}) => (
    <AlarmListItem
      text={item.text}
      switchValue={item.on}
      name={item.name}
      onSwitchToggle={() => this.toggleAlarmItem(item.key)}
      deleteFunction={() => this.deleteAlarmItem(item.key)}
    />
  );

  //**** render

  render(){

    return(
      <MainView
        componentRight={this.componentRight } >
        <FlatList
          data={this.state.alarms}
          extraData={this.state}
          renderItem={this._renderItem}
        />
        <Modal
          animationType={'slide'}
          visible={this.state.showModal}
          onRequestClose={() => this.closeModal()}
          >
          <MainView
            componentLeft = {this.modalComponentLeft }
            componentRight = {this.modalComponentRight } >
            <View style={[styles.flexColumn, {padding:0}]}>
              <View style={[styles.flexRow, {backgroundColor:'#bee1fc', paddingTop:20, paddingBottom:20}]} >
                <Picker
                  style={{width:100}}
                 selectedValue={this.state.selectedHour}
                 onValueChange={(itemValue, itemIndex) => this.setState({selectedHour: itemValue})}
                  itemStyle={{color:'black', fontSize:50, padding:0, fontWeight:'bold'}} >
                  {
                    this.hours.map((v,i) =>
                    <PickerItem key={v} label={(v+"").padStart(2,'0')} value={v+""} /> )
                }
                </Picker>
                <Picker
                  style={{width:100}}
                 selectedValue={this.state.selectedMinute}
                 onValueChange={(itemValue, itemIndex) => this.setState({selectedMinute: itemValue})}
                  itemStyle={{color:'black', fontSize:50, padding:0, fontWeight:'bold'}} >
                  {
                    this.minutes.map((v,i) =>
                    <PickerItem key={v} label={(v+"").padStart(2,'0')} value={v+""} /> )
                  }
                </Picker>
              </View>
              <View style={{padding:10, borderBottomColor:'gray', borderBottomWidth:1}}>
              <Text style={{fontWeight:'bold', fontSize:15, color:'gray'}}>Nombre de la Alarma</Text>
              <TextInput
                  style={[styles.bodyText, {textAlign:'center', fontSize:20}]}
                  placeholder = "Ej. Media Mañana"
                  onChangeText={(text) => this.setState({selectedName: text})} />
              </View>
            </View>
          </MainView>
        </Modal>
        </MainView>
    );
  }

}
