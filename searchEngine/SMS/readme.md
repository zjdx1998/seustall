# foof-SMS Documention

## Usage

### Import
`npm install qcloudsms_js --save`
`npm install crypto-js --save`

### In Server
nodejs: 
```js
    var sms = require('./SMSVerify');
    sms.SMSVerify(phoneNumber:int); //provides the Phone Number(without National-flag 86), and returns the verify code
```
