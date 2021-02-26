class Validator {

  constructor() {
    this.cardNumber = null;
    this.Brand = null;
  }
  
  findBrandName() {
    var discoverArray = {};
    var jcbArray = {};
    var masterCardNumberArray = {};
    for (var i=622126;i<622926;i++) {
      discoverArray[`${i}`] = null;
    }
    for (i=3528;i<3590;i++) {
      jcbArray[`${i}`] = null;
    }
    for (i=222100;i<272100;i++) {
      masterCardNumberArray[`${i}`] = null;
    }
    if (this.cardNumber.substring(0, 2) in {'34':null,'37':null}) {
      this.Brand = 'American Express';
    } else if (this.cardNumber.substring(0,3) in {'300':null, '301':null, '302':null, '303':null, '304':null, '305':null}) {
      this.Brand = 'Diners Club - Carte Blanche';
    } else if (this.cardNumber.substring(0,2) in {'36':null}) {
      this.Brand = 'Diners Club - International';
    } else if (this.cardNumber.substring(0,2) in {'54':null}) {
      this.Brand = 'Diners Club - USA & Canada';
    } else if (this.cardNumber.substring(0,4) in {'6011':null} || this.cardNumber.substring(0,3) in {'644':null, '645':null, '646':null, '647':null, '648':null, '649':null} || this.cardNumber.substring(0,2) in {'65':null} || this.cardNumber.substring(0,6) in discoverArray) {
      this.Brand = 'Discover';
    } else if (this.cardNumber.substring(0,3) in {'637':null, '638': null, '639': null}) {
      this.Brand = 'InstaPayment';
    } else if (this.cardNumber.substring(0,4) in jcbArray) {
      this.Brand = 'JCB';
    } else if (this.cardNumber.substring(0,4) in {'5018':null, '5020':null, '5038':null, '5893':null, '6304':null, '6759':null, '6761':null, '6762':null, '6763':null}) {
      this.Brand = 'Maestro';
    } else if (this.cardNumber.substring(0,2) in {'51':null, '52':null, '53':null, '54':null, '55':null} || this.cardNumber.substring(0,6) in masterCardNumberArray) {
      this.Brand = 'MasterCard';
    } else if (this.cardNumber.substring(0,4) in {'4026':null, '4508':null, '4844':null, '4913':null, '4917':null} || this.cardNumber.substring(0,6) in {'417500':null}) {
      this.Brand = 'VISA Electron';
    } else if (this.cardNumber.substring(0, 1) in {'4':null}) {
      this.Brand = 'VISA';
    } else {
      this.Brand = 'Unknown Brand';
    }
  }

  validate(cardNumber) {
    if (cardNumber === null) { return 'Not a valid Credit Card Number'; }
    if (typeof cardNumber === 'boolean') { return 'Not a valid Credit Card Number'; }
    if (cardNumber === "") { return 'Not a valid Credit Card Number'; }
    this.cardNumber = cardNumber.trim().replace(/ /g, '');
    if (/^\d+$/.test(this.cardNumber) && cardNumber.length <= 19 && cardNumber.length >=13) {
      this.findBrandName();
      const lastDigit = parseInt(this.cardNumber.substring(this.cardNumber.length-1));
      var base = this.cardNumber.substring(0, this.cardNumber.length-1).split("").reverse().join("");
      base = base.split("").map((digit, index) => {
        if (index%2 !== 0) {
          return digit;
        } else {
          return `${2*parseInt(digit)}`;
        }
      }).map((digit) => {
        if (parseInt(digit) <= 9) {
          return parseInt(digit);
        } else {
          return parseInt(digit)-9;
        }
      }).reduce((a, b) => {return a+b;});
      base = (base*9)%10;
      if (base === lastDigit) {
        return `${this.cardNumber} is a valid ${this.Brand} credit card number`
      } else {
        return `${this.cardNumber} is not a valid credit card number!`
      }
    } else {
      return 'Not a valid Credit Card Number';
    }
  }
}

// fakeCardNumbers = ['4005326177721525', '4876222974395162602', '4929506767072040',
//                    '6011774416320400', '6011384336694767', '6011567666603569884',
//                    '30150771169619', '30197533276190', '30270612448111',
//                    '4917436043241207', '4026285969199693', '4917616740121816',
//                    '2720998830329454', '5391507842619561', '5225894886748973',
//                    '3533843051763608', '3537820198640705', '3543964039919525111',
//                    '36306026224146', '36975911733054', '36846160099507',
//                    '6389139505328231', '6378860259421889', '6380930097224500',
//                    '370450958417080', '372802945816907', '378649916678657',
//                    '5440196229541514', '5590594671573738', '5416444034555182',
//                    '5018087348819638', '5893402473368352', '5893828791162277'];

// let v = new Validator();
// for (const i in fakeCardNumbers) {
//   console.log(v.validate(fakeCardNumbers[i]));
// }
