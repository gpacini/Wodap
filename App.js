import React, {Component} from 'react';
import { View, StyleSheet, Dimensions, AsyncStorage, StatusBar, Image } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap, TabViewPagerExperimental } from './Modules/react-native-tab-view/src/index';
import WaterCalculatorView from './Views/WaterCalculatorView';
import IdentificationNumberView from "./Views/IdentificationNumberView";
import AlarmsView from "./Views/AlarmsView";
import NutritionView from "./Views/NutritionView";
import EarthView from "./Views/EarthView";
import InfoView from "./Views/InfoView";

const styles = require("./Styles/Styles.js");

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const Alarms = () => <AlarmsView />
const Calculator = () => <WaterCalculatorView />
const Nutrition = () => <NutritionView />
const Earth = () => <EarthView />
const Info = () => <InfoView />

const AlarmsImage = () => <Image style={{width:42, height:42}} source={require('./assets/icons/alarms.png')} />
const CalculatorImage = () => <Image style={styles.tabImage} source={require('./assets/icons/calculator.png')} />
const NutritionImage = () => <Image style={[styles.tabImage, {width:38}]} source={require('./assets/icons/nutrition.png')} />
const EarthImage = () => <Image style={styles.tabImage} source={require('./assets/icons/earth.png')} />
const InfoImage = () => <Image style={styles.tabImage} source={require('./assets/icons/info.png')} />

const SelectedAlarmsImage = () => <Image style={{width:42, height:42}} source={require('./assets/icons/alarms_s.png')} />
const SelectedCalculatorImage = () => <Image style={styles.tabImage} source={require('./assets/icons/calculator_s.png')} />
const SelectedNutritionImage = () => <Image style={[styles.tabImage, {width:38}]} source={require('./assets/icons/nutrition_s.png')} />
const SelectedEarthImage = () => <Image style={styles.tabImage} source={require('./assets/icons/earth_s.png')} />
const SelectedInfoImage = () => <Image style={styles.tabImage} source={require('./assets/icons/info_s.png')} />

export default class App extends Component {

  state = {
    index: 0,
    registered : true,
    routes: [
      { key: 'alarms' },
      { key: 'calculator' },
      { key: 'nutrition'},
      { key: 'earth'},
      { key: 'info'},
    ],
  };

  _handleIndexChange = index => this.setState({ index });
  _renderHeader = props => <TabBar {...props}
                              style={{backgroundColor:'white', borderTopColor:'gray', borderTopWidth:2}}
                              renderIcon={this._renderIcon}
                              indicatorStyle={{backgroundColor:'transparent'}} />;
  _renderPager = props => <TabViewPagerExperimental {...props} swipeEnabled={false} />;

  _renderIcon = (scene) => {
    switch(scene.route.key){
      case 'alarms':
        return scene.focused ? SelectedAlarmsImage() : AlarmsImage();
      case 'calculator':
        return scene.focused ? SelectedCalculatorImage() : CalculatorImage();
      case 'nutrition':
        return scene.focused ? SelectedNutritionImage() : NutritionImage();
      case 'earth':
        return scene.focused ? SelectedEarthImage() : EarthImage();
      case 'info':
        return scene.focused ? SelectedInfoImage() : InfoImage();
    }
  }

  _renderScene = SceneMap({
    alarms: Alarms,
    calculator: Calculator,
    nutrition: Nutrition,
    earth: Earth,
    info: Info,
  });

  constructor(props){
    super(props);
    //AsyncStorage.clear();
    this.loadKey();
  }

  loadKey(){
    AsyncStorage.getItem('key', (err, result) => {
        var key = JSON.parse(result);
        if( key !== null ){
          this.setState({registered: key.registered});
        } else {
          this.setState({registered: false});
        }
    });
  }

  async saveKey(){
    try {
      await AsyncStorage.setItem('key', '{"registered": true}');
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  render() {
    if( this.state.registered ){
      return (
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderFooter={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          renderPager = {this._renderPager}
          initialLayout={initialLayout}
        />
      );
    } else {
      return (
        <IdentificationNumberView
          onValidated={() => {
            this.saveKey();
            this.setState({registered: true})
          }
        }
        />
      );
    }

  }
}
