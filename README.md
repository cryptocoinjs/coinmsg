crypto-msgsig
=============

Message signing for Bitcoin and other cryptocurrencies.

Install
-------

    npm install --save crypto-msgsig

Example
-------

```js
var msgsig  = require('crypto-msgsig')

  , privkey = new Buffer('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'hex')
  , addr    = '1F3sAm6ZtwLAUnj7d38pGFxtP3RVEvtsbV'
  , message = 'Hello, World!'

var sig = msgsig.sign(privkey, message) // => Buffer

msgsig.verify(addr, sig, message) // => true
msgsig.verify(addr, sig.toString('base64'), message) // => true

msgsig.format(addr, sig, message) // returns "BEGIN BITCOIN SIGNED MESSAGE" formatting

// With other cryptocurrencies:
var msgsig = require('crypto-msgsig')({
  curve: 'secp256k1' // optional, defaults to secp256k1
, magicPrefix: '\x19Dogecoin Signed Message:\n'
, coinname: 'DOGECOIN'
})

// ... and use msgsig as above
```

License
-------
MIT

Credits
-------
Based on the bitcoinjs-lib implementation.
