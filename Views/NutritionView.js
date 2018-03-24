import React, {Component} from 'react';
import {Image, View, Text, ScrollView, Dimensions} from 'react-native';
import MainView from './MainView.js';

const width = Dimensions.get('window').width - 20;
const ratio = width/568;
const height = 768 * ratio;
const imgStyle = {width:width, height:height, marginTop:10, marginBottom:10};
const imgStyle2 = {width:width, height:height/2, marginTop:10, marginBottom:10};


const ratio2 = width/600;
const height2 = 370 * ratio2;
const imgStyle3 = {width:width, height:height2, marginTop:10, marginBottom:10};

const  Image1 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/nutrition/1.png')} />
const  Image2 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/nutrition/2.png')} />
const  Image3 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/nutrition/3.png')} />
const  Image4 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/nutrition/4.png')} />
const  Image5 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/nutrition/5.png')} />
const  Image6 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/nutrition/6.png')} />
const  Image7 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/nutrition/7.png')} />
const  Image8 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/nutrition/8.png')} />
const  Image9 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/nutrition/9.png')} />
const Image10 = () => <Image style={imgStyle2} resizeMode="contain" source={require('../assets/nutrition/10.png')} />
const Image11 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/nutrition/11.png')} />
const Image12 = () => <Image style={imgStyle} resizeMode="contain" source={require('../assets/nutrition/12.png')} />
const Image13 = () => <Image style={imgStyle2} resizeMode="contain" source={require('../assets/nutrition/13.png')} />


const  Image14 = () => <Image style={imgStyle3} resizeMode="contain" source={require('../assets/info/1.png')} />
const  Image15 = () => <Image style={imgStyle3} resizeMode="contain" source={require('../assets/info/2.png')} />

const styles = require("../Styles/Styles.js");

export default class NutritionView extends Component {

  render(){
    return(
      <MainView>
      <ScrollView contentContainerStyle={{padding:10}}>
          <View>
            <Text style={{fontSize:30, textAlign:'center'}}>¿Conoces las ventajas de beber agua?</Text>
          </View>
          <Text >
            <Text style={{fontWeight:'bold'}}>Perder peso: </Text>
            <Text>El agua le ayuda a perder peso puesto que reduce el hambre</Text>
          </Text>
          <Image1 />

          <Text >
            <Text style={{fontWeight:'bold'}}>Remedio natural para el dolor de cabeza: </Text>
            <Text>Ayuda a aliviar el dolor de cabeza y dolores de espalda causados por la deshidratación</Text>
          </Text>
          <Image2 />
          <Image3 />

          <Text>
            <Text style={{fontWeight:'bold'}}>Piel más saludable: </Text>
            <Text>El agua ayuda a reponer los tejidos de la piel, la hidrata y aumenta su elasticidad, retrasando el proceso de envejecimiento.</Text>
          </Text>
          <Image4 />

          <Text style={{flex:1}}>
            <Text style={{fontWeight:'bold'}}>Mejora la productividad: </Text>
            <Text>Beber agua ayuda a pensar mejor, estar más atento y más concentrado.</Text>
          </Text>
          <Image5 />

          <Text style={{flex:1}}>
            <Text style={{fontWeight:'bold'}}>Mejor ejercicio: </Text>
            <Text>El agua regula la temperatura corporal, ayuda a sentirse con más energía al hacer ejercicio y sirve de combustible para el músculo.</Text>
          </Text>
          <Image6 />

          <Text style={{flex:1}}>
            <Text style={{fontWeight:'bold'}}>Ayuda en la digestión: </Text>
            <Text>El agua incrementa la actividad metabólica, también previene el estreñimiento</Text>
          </Text>
          <Image7 />

          <Text style={{flex:1}}>
            <Text style={{fontWeight:'bold'}}>Menos calambres y esguinces: </Text>
            <Text>Una hidratación adecuada ayuda a mantener lubricados los músculos y las articulaciones.</Text>
          </Text>
          <Image8 />
          <Image9 />

          <Text style={{flex:1}}>
            <Text style={{fontWeight:'bold'}}>Reduce el riesgo de cáncer: </Text>
            <Text>Beber la cantidad recomendable de agua hace que el hígado, los riñones, el sistema digestivo e inmunológico cumplan muy bien con sus funciones.</Text>
          </Text>
          <Image10 />

          <Text style={{flex:1}}>
            <Text style={{fontWeight:'bold'}}>Alivia la fatiga: </Text>
            <Text>El agua es utilizada por el cuerpo para ayudar a eliminar las toxinas y productos de desecho del cuerpo.</Text>
          </Text>
          <Image11 />

          <Text style={{flex:1}}>
            <Text style={{fontWeight:'bold'}}>Buen estado de ánimo: </Text>
            <Text>Gracias a que su cuerpo se siente bien, su mente se siente feliz.</Text>
          </Text>
          <Image12 />

          <Text style={{flex:1}}>
            <Text style={{fontWeight:'bold'}}>Reduce el riesgo de enfermedades: </Text>
            <Text>Beber la cantidad de agua adecuada ayuda a luchar contra la gripe y otras dolencias como los cálculos y ataques al corazón.</Text>
          </Text>
          <Image13 />

          <View>
            <Text style={{fontSize:30, textAlign:'center'}}>Pulseras detectoras de radiación</Text>
          </View>
          <Text >
            <Text>En la pulsera que vino en tu Wodap JA, tienes unos cuantos mullos detectores de rayos UV, mientras más intenso sea el color, más intenso son los rayos ultravioletas.</Text>
          </Text>
          <Image14 />

          <Text>
            <Text>Los rayos UV son más intenso mientras más cerca se está de la línea ecuatorial. Son los principales causantes de daños y cáncer a la piel, ya que afecta el ADN de las células.</Text>
            <Text>Una exposición continua a rayos UV puede también causar un envejecimiento prematuro en la piel, con quemaduras, manchas y hasta arrugas. </Text>
          </Text>
          <Image15 />

          <Text >
            <Text>Si los mullos de tu pulsera brillan muy fuerte, ¡deberías alejarte del sol o usar gorra!</Text>
          </Text>
      </ScrollView>
      </MainView>
    );
  }

}
