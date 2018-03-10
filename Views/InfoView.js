import React, {Component} from 'react';
import {Image, View, Text, ScrollView, Dimensions} from 'react-native';
import MainView from './MainView.js';

const width = Dimensions.get('window').width - 20;
const ratio = width/600;
const height = 370 * ratio;
const imgStyle = {width:width, height:height, marginTop:10, marginBottom:10};

const  Image1 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/info/1.png')} />
const  Image2 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/info/2.png')} />

const styles = require("../Styles/Styles.js");

export default class InfoView extends Component {

  render(){
    return(
      <MainView>
      <ScrollView contentContainerStyle={{padding:10}}>
          <View>
            <Text style={{fontSize:30, textAlign:'center'}}>Pulseras detectoras de radiación</Text>
          </View>
          <Text >
            <Text>En la pulsera que vino en tu Wodap JA, tienes unos cuantos mullos detectores de rayos UV, mientras más intenso sea el color, más intenso son los rayos ultravioletas.</Text>
          </Text>
          <Image1 />

          <Text>
            <Text>Los rayos UV son más intenso mientras más cerca se está de la línea ecuatorial. Son los principales causantes de daños y cáncer a la piel, ya que afecta el ADN de las células.</Text>
            <Text>Una exposición continua a rayos UV puede también causar un envejecimiento prematuro en la piel, con quemaduras, manchas y hasta arrugas. </Text>
          </Text>
          <Image2 />

          <Text >
            <Text>Si los mullos de tu pulsera brillan muy fuerte, ¡deberías alejarte del sol o usar gorra!</Text>
          </Text>
      </ScrollView>
      </MainView>
    );
  }

}
