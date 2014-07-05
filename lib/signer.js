var _ecdsa  = require('ecdsa')
  , Binary  = require('crypto-binary').MessageBuilder
  , Point   = require('ecurve').Point
  , BigInt  = require('bigi')
  , coins   = require('coinstring')
  , hashing = require('crypto-hashing')
  , sha256  = hashing.sha256
  , hash160 = hashing.sha256ripe160
  , format  = require('./format')

module.exports = makeSigner

function makeSigner(opt) {
  var ecdsa = _ecdsa(opt.curve || 'secp256k1')
    , magicPrefix = new Buffer(opt.magicPrefix)

  return {
    sign: sign.bind(null, ecdsa, magicPrefix)
  , verify: verify.bind(null, ecdsa, magicPrefix)
  , format: format.bind(null, opt.coinname)
  }
}

function magicHash(magicPrefix, message) {
  Buffer.isBuffer(message) || (message = new Buffer(message, 'utf8'))

  return sha256.x2(new Binary()
    .put(magicPrefix)
    .putVarInt(message.length)
    .put(message)
    .raw()
  )
}

function sign(ecdsa, magicPrefix, privkey, message, compressed) {
  var hash = magicHash(magicPrefix, message)
    , e = BigInt.fromBuffer(hash)

    , sig = ecdsa.sign(hash, privkey)
    , Q = ecdsa.ecparams.g.multiply(BigInt.fromBuffer(privkey))
    , i = ecdsa.calcPubKeyRecoveryParam(e, sig, Q)

  return ecdsa.serializeSigCompact(sig, i, (compressed == null || compressed))
}

function verify(ecdsa, magicPrefix, address, sig, message) {
  Buffer.isBuffer(sig) || (sig = new Buffer(sig, 'base64'))

  var hash = magicHash(magicPrefix, message)
    , e = BigInt.fromBuffer(hash)
    , parsed = ecdsa.parseSigCompact(sig)

    , Q = ecdsa.recoverPubKey(e, parsed.signature, parsed.i)
    , pubkey = Q.getEncoded(parsed.compressed)

    , networkVer = coins.decode(address)[0]
    , actualAddress = coins.encode(hash160(pubkey), networkVer)

  return address == actualAddress
}
