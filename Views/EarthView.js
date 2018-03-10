import React, {Component} from 'react';
import {Image, View, Text, ScrollView, Dimensions} from 'react-native';
import MainView from './MainView.js';

const width = Dimensions.get('window').width - 20;
const ratio = width/750;
const height = 487 * ratio;
const imgStyle = {width:width, height:height, marginTop:10, marginBottom:10};

const  Image1 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/earth/1.png')} />
const  Image2 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/earth/2.png')} />
const  Image3 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/earth/3.png')} />
const  Image4 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/earth/4.png')} />

const styles = require("../Styles/Styles.js");

export default class EarthView extends Component {

  render(){
    return(
      <MainView>
      <ScrollView contentContainerStyle={{padding:10}}>
          <View>
            <Text style={{fontSize:30, textAlign:'center'}}>El Plástico en el Planeta</Text>
          </View>
          <Text >
            <Text>Necesita alrededor de 450 hasta 1000 años para descomponerse.</Text>
          </Text>
          <Image1 />

          <Text>
            <Text>Ningún plástico producido (empezó en 1860) se ha descompuesto.</Text>
          </Text>
          <Image2 />

          <Text>
            <Text>El plástico mata 1 millón de aves marinas y más de 100.000 mamíferos marinos y tortugas cada año.</Text>
          </Text>
          <Image3 />

          <Text>
            <Text>Se calcula que para el 2050 habrá más plástico que peces en el océano.</Text>
          </Text>
          <Image4 />

          <Text>
            <Text style={{fontWeight:'bold'}}>¡Pon tu granito de arena! Usando tu Wodap JA, puedes reducir el uso de botellas plásticas.</Text>
          </Text>
      </ScrollView>
      </MainView>
    );
  }

}
