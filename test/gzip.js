/*eslint-env mocha*/
/*eslint no-invalid-this:0*/
/*jshint -W100*/
var assert = require('power-assert');
var helper = require('./_helper');
var cli    = require('../index');

describe('gzip:enable', function () {
  before(function () {
    cli.set('gzip', true);
  });

  it('gzipヘッダを送信して返ってきた圧縮HTMLが解凍されてからUTF-8に変換される', function (done) {
    cli.set('browser', 'chrome');
    cli.fetch(helper.url('gzip', 'utf-8'), function (err, $, res, body) {
      assert(res.headers['content-encoding'] === 'gzip');
      //assert(res.headers.vary === 'Accept-Encoding');
      //assert(res.headers['transfer-encoding'] === 'chunked');
      assert($('title').text() === '夏目漱石「私の個人主義」');
      done();
    });
  });
});

describe('gzip:disable', function () {
  before(function () {
    cli.set('gzip', false);
  });

  it('gzipヘッダを送信しないで返ってきた生のHTMLがそのままUTF-8に変換される', function (done) {
    cli.fetch(helper.url('gzip', 'utf-8'), function (err, $, res, body) {
      assert(! ('content-encoding' in res.headers));
      assert(! ('transfer-encoding' in res.headers));
      assert(! ('vary' in res.headers));
      assert(res.headers['content-length'] > 0);
      assert($('title').text() === '夏目漱石「私の個人主義」');
      done();
    });
  });
});
