var coinmsg  = require('..'),
    assert = require('assert'),
    ok = assert.ok,
    eq = assert.equal,

    privkey = new Buffer('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'hex'),
    addr_c  = '1F3sAm6ZtwLAUnj7d38pGFxtP3RVEvtsbV',
    addr_uc = '1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN',
    message = 'foobar'

describe('coinmsg', function() {
  it('signs and verifies (compressed)', function() {
    var sig = coinmsg.sign(privkey, message, true)
    ok(coinmsg.verify(addr_c, sig, message))
    eq(sig.toString('base64'),
      'ILtpIVksn3ie1AyKSjU/Hokv1HvMlRmersHqQSodEcnHZ4A8cT/2MSxFQ88kPftQWjPx7gAVFXiKSpX7Itu7UgA=')
  })

  it('signs and verifies (uncompressed)', function() {
    var sig = coinmsg.sign(privkey, message, false)
    ok(coinmsg.verify(addr_uc, sig, message))
    eq(sig.toString('base64'),
      'HLtpIVksn3ie1AyKSjU/Hokv1HvMlRmersHqQSodEcnHZ4A8cT/2MSxFQ88kPftQWjPx7gAVFXiKSpX7Itu7UgA=')
  })

  it('defaults to compressed', function(){
    var sig = coinmsg.sign(privkey, message)
    ok(coinmsg.verify(addr_c, sig, message))
  })

  it('works with Unicode', function(){
    var message = '☃ ☂ and ☀',
       sig = coinmsg.sign(privkey, message)
    ok(coinmsg.verify(addr_c, sig, message))
    eq(sig.toString('base64'),
      'Hz1bTUaVOJhWauWt/7DIw14PMkI2xgW7694CNaYSzknwPVbE2Tx9Fd0aMZg0KGyEcORfky/2s1Xej1ngubL1B80=')
  })

  it('fails for invalid signatures', function() {
    var sig_c = coinmsg.sign(privkey, 'x'+message, true),
        sig_uc = coinmsg.sign(privkey, 'x'+message, false)
    ok(!coinmsg.verify(addr_c, sig_c, message))
    ok(!coinmsg.verify(addr_uc, sig_uc, message))
  })

  it('supports base64 signatures', function() {
    var sig = coinmsg.sign(privkey, message)
    ok(coinmsg.verify(addr_c, sig.toString('base64'), message))
  })

  it('uses determinstic K', function() {
    eq(coinmsg.sign(privkey, 'hello').toString('hex'),
       coinmsg.sign(privkey, 'hello').toString('hex'))
  })
})
