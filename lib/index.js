var makeSigner = require('./signer')
  , hasOwn = Object.prototype.hasOwnProperty

bitcoinSigner = makeSigner({
  coinname: 'BITCOIN'
, curve: 'secp256k1'
, magicPrefix: '\x18Bitcoin Signed Message:\n'
})

module.exports = exports = makeSigner

for (k in bitcoinSigner) if (hasOwn.call(bitcoinSigner, k)) {
  exports[k] = bitcoinSigner[k]
}

