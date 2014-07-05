var pkg = require('../package.json')
  , version = pkg.name + '/v' + pkg.version

module.exports = function(coinname, address, sig, message) {
  Buffer.isBuffer(sig) && (sig = sig.toString('base64'))

  return [
    '-----BEGIN '+coinname+' SIGNED MESSAGE-----',
    message,
    '-----BEGIN '+coinname+' SIGNATURE-----',
    'Version: ' + version,
    'Address: ' + address,
    sig,
    '-----END '+coinname+' SIGNATURE-----'
  ].join('\n')
}
