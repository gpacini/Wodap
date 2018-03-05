
const kilogram = 'kg';
const pound = 'lb';

export class WaterCalculator {

  constructor(){
    this.weight = 0;
    this.units = kilogram;
    this.excercise = 0;
    this.intake = 0;
  }

  setValues(weight, units, excercise){
      this.weight = weight;
      this.units = units;
      this.excercise = excercise;
  }

  calculate(){
    var finalWeight = this.units == pound ? this.weight : this.weight * 2.20;
    var withoutExcercise = finalWeight * 0.5;
    var intake = withoutExcercise + (this.excercise/30 * 12);
    this.intake = intake * 0.0295735;
  }

  getIntake(){
    return this.intake.toFixed(2);
  }
}
