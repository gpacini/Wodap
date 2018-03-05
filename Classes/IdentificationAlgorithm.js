
class IdentificationAlgorithm {

  identifyNumber(number){
    if( number.length != 9 ){
      console.log("Length failed");
      return false;
    }
    for( let i = 2; i < 9; i+= 3){
      if( number.charAt(i) % 2 != 0 ){
        console.log("Number at "+(i+1)+" failed");
        return false;
      }
    }
    var sum = 0;
    for( let i = 0; i < 9; i++ ){
      var num = parseInt(number.charAt(i));
      sum += num;
    }
    if( sum != 40 ){
      console.log("Sum " + sum + " failed");
      return false;
    }
    return true;
  }

  generateNumber(){
    var number = this._genNumber();
    console.log(number);
    while( !this.identifyNumber(number) ){
      number = this._genNumber();
    }
    return number;
  }

  _genNumber(){
    var number = '';
    for( let i = 0; i < 9 ; i++ ){
      var num = Math.floor(Math.random() * 10);
      if( (i+1) % 3 == 0 ){
        while( num % 2 != 0 ){
          num = Math.floor(Math.random() * 10);
        }
      }
      number += num;
    }
    return number;
  }

}

export let identificationAlgorithm = new IdentificationAlgorithm();
