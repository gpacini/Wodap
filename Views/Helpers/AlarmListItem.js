import React, {PureComponent} from 'react';
import {View, Switch, Text} from 'react-native';
import Swipeout from '../../Modules/react-native-swipeout/src/index';

const styles = require('../../Styles/Styles');

export default class AlarmListItem extends PureComponent{

  constructor(props){
    super(props);
  }

  render(){
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      //underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.props.deleteFunction() }
    }];

    return(
      <Swipeout right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
      <View style={{flex:1,backgroundColor:'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,}}>
        <View style={{flex:1, flexDirection:'row', padding: 20}}>
          <View style={{flex:1, flexDirection:'column' }} >
            <Text style={styles.listText}>{this.props.text}</Text>
            <Text >{this.props.name}</Text>
          </View>
          <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}} >
            <Switch
            value={this.props.switchValue}
            key={this.props.key}
            onValueChange={() => {this.props.onSwitchToggle()}} />
          </View>
        </View>
      </View>
      </Swipeout>
    );
  }

}
