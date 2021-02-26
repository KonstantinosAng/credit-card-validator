# Credit Card validator

A simple module to validate credit card numbers written in Python and Javascript.

## Requirements

No extra libraries are required.

## Usage

Python

```

from validate import validator

ret = validator().validate(cardNumber)
print(ret)

```

Javascript

```

let v = new Validator();
console.log(v.validate(cardNumber));

```

There are plenty of fake credit card numbers in both the [Python module](src/validate.py) and [Javascript Module](src/validate.js)
for testing.
