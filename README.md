coinmsg
=======

Message signing for Bitcoin and other cryptocurrencies.

Install
-------

    npm install --save coinmsg

Example
-------

```js
var coinmsg  = require('coinmsg'),

    privkey = new Buffer('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'hex'),
    addr    = '1F3sAm6ZtwLAUnj7d38pGFxtP3RVEvtsbV',
    message = 'Hello, World!'

var sig = coinmsg.sign(privkey, message) // => Buffer

coinmsg.verify(addr, sig, message) // => true
coinmsg.verify(addr, sig.toString('base64'), message) // => true

coinmsg.format(addr, sig, message) // returns "BEGIN BITCOIN SIGNED MESSAGE" formatting

// With other cryptocurrencies:
var coinmsg = require('coinmsg')({
  curve: 'secp256k1', // optional, defaults to secp256k1
  magicPrefix: '\x19Dogecoin Signed Message:\n',
  coinname: 'DOGECOIN'
})

// ... and use coinmsg as above
```

License
-------
MIT

Credits
-------
Based on the bitcoinjs-lib implementation.
