class validator():
  
  def __init__(self):
    self.cardNumber = None
    self.Brand = None
  
  def __findBrand(self):
    if str(self.cardNumber)[:2] in ['34','37']:
      self.Brand = 'American Express'
    elif str(self.cardNumber)[:3] in ['300', '301', '302', '303', '304', '305']:
      self.Brand = 'Diners Club - Carte Blanche'
    elif str(self.cardNumber)[:2] in ['36']:
      self.Brand = 'Diner Club - International'
    elif str(self.cardNumber)[:2] in ['54']:
      self.Brand = 'Diners Club - USA & Canada'
    elif str(self.cardNumber)[:4] in ['6011'] or str(self.cardNumber)[0:3] in ['644', '645', '646', '647', '648', '649', '65'] or str(self.cardNumber)[0:6] in [str(x) for x in range(622126, 622926)]:
      self.Brand = 'Discover'
    elif str(self.cardNumber)[:3] in ['637', '638', '639']:
      self.Brand = 'InstaPayment'
    elif str(self.cardNumber)[:4] in [str(x) for x in range(3528, 3590)]:
      self.Brand = 'JCB'
    elif str(self.cardNumber)[:4] in ['5018', '5020', '5038', '5893', '6304', '6759', '6761', '6762', '6763']:
      self.Brand = 'Maestro'
    elif str(self.cardNumber)[:2] in ['51', '52', '53', '54', '55'] or str(self.cardNumber)[:6] in [str(x) for x in range(222100,272100)]:
      self.Brand = 'MasterCard'
    elif str(self.cardNumber)[:4] in ['4026', '4508', '4844', '4913', '4917'] or str(self.cardNumber)[:6] == '417500':
      self.Brand = 'VISA Electron'
    elif str(self.cardNumber)[0] in ['4']:
      self.Brand = 'VISA'
    else:
      self.Brand = 'Uknown Brand'

  def validate(self, number):
    if number is None: return 'Not a valid Credit Card Number'
    if number is bool: return 'Not a valid Credit Card Number'
    if number is float: return 'Not a valid Credit Card Number'
    number = ''.join(x for x in str(number).strip().split())
    if number.isdigit() and 13 <= len(number) <= 19:
      # Identify Brand
      self.cardNumber = int(number)
      self.__findBrand()
      # Luhn's Algorithm
      lastDigit = int(number[-1])
      base = [int(x) for x in reversed(number[:-1])]
      base = [x if i%2!=0 else 2*x for i, x in enumerate(base)]
      base = [x if x <= 9 else x-9 for x in base]
      base = sum(base)
      base = (base*9)%10
      if base == lastDigit:
        return f'{self.cardNumber} is a valid {self.Brand} credit card!'
      else:
        return f'{self.cardNumber} is not a valid credit card number!'
    else:
      return 'Not a valid Credit Card Number'


if __name__  == "__main__":

  fakeCardNumbers = ['4005326177721525', '4876222974395162602', '4929506767072040',
                     '6011774416320400', '6011384336694767', '6011567666603569884',
                     '30150771169619', '30197533276190', '30270612448111',
                     '4917436043241207', '4026285969199693', '4917616740121816',
                     '2720998830329454', '5391507842619561', '5225894886748973',
                     '3533843051763608', '3537820198640705', '3543964039919525111',
                     '36306026224146', '36975911733054', '36846160099507',
                     '6389139505328231', '6378860259421889', '6380930097224500',
                     '370450958417080', '372802945816907', '378649916678657',
                     '5440196229541514', '5590594671573738', '5416444034555182',
                     '5018087348819638', '5893402473368352', '5893828791162277']

  for cardNumber in fakeCardNumbers:
    print(validator().validate(cardNumber))
