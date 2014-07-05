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

// With other cryptocurrencies:
var coinmsg = require('coinmsg')({
  coinname: 'DOGECOIN',
  curve: 'secp256k1', // optional, defaults to secp256k1
  magicPrefix: '\x19Dogecoin Signed Message:\n'
})

// ... and use coinmsg as above
```

API
---

### Methods

#### `sign(privkey, message[, compressed])`

Sign `message` with `privkey` and return the signature as a `Buffer`.

`compressed` defaults to true.

#### `verify(addr, sig, message)`

Verify that `sig` is valid signature for the `message` signed by `addr`.

`sig` can be provided as a `Buffer` or base64 string.

#### `format(addr, sig, message)`

Return a "BEGIN BITCOIN SIGNED MESSAGE ..." formatted message.

### Other cryptocurrencies

#### `coinmsg({ coinname: ..., curve: ..., magicPrefix: ... })`

Returns an object with `sign()`, `verify()` and `format()` for the
provided options.

`curve` is optional and defaults to secp256k1

Test
----

    $ git clone https://github.com/cryptocoinjs/coinmsg.git && cd coinmsg
    $ npm install && npm test

License
-------
MIT

Credits
-------
Based on the bitcoinjs-lib implementation.
