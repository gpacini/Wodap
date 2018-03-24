import React, {Component} from 'react';
import {View, Text, Image, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import NavigationBar from '../Modules/navigationbar-react-native/index';

const styles = require("../Styles/Styles.js");

const backgroundColor = '#bee1fc';

const navBarStyle = {
  borderBottomColor: 'gray',
  backgroundColor: backgroundColor,
  padding: 20,
  paddingBottom: 40,
}

const statusBarStyle = {
  barStyle: 'dark-content',
}

const ComponentTop = () => {
  return(
    <View style={{ flex: 1, alignItems:'center' }}>
      <Image style={{width:110, height:50}} source={require('../assets/logo.png')} />
    </View>
  );
};

export default class MainView extends Component {

  navigationbarProps = {};

  constructor(props){
    super(props);
    if( this.props.componentRight != null ){
      this.navigationbarProps.componentRight = <this.props.componentRight />;
    }
    if( this.props.componentLeft != null ){
      this.navigationbarProps.componentLeft = <this.props.componentLeft />;
    }
  }

  componentRight = () =>{
    return this.props.componentRight != null ? <this.props.componentRight /> : <View />;
  }

  componentLeft = () =>{
    return this.props.componentLeft != null ? <this.props.componentLeft /> : <View />;
  }


  render(){
    return(
      <View style={[styles.container, styles.mainView, {backgroundColor: backgroundColor}]}>
        <NavigationBar
          {...this.navigationbarProps}
          componentCenter = {<ComponentTop />}
          navigationBarStyle = {navBarStyle}
          statusBarStyle = {statusBarStyle}
        />
          <View style = {{flex: 1, backgroundColor:'white'}}>
            {this.props.children}
          </View>
        </View>
    );
  };


}
