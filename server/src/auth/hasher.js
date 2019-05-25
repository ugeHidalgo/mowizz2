/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';


module.exports.createSalt = function () {
    var len = 8;
    return crypto.randomBytes(Math.ceil(len/2)).toString('hex').substring(0,len);
};

module.exports.encrypt =  function (text, salt) {
    var cipher = crypto.createCipher(algorithm, salt),
        crypted = cipher.update(text,'utf8','hex');

  crypted += cipher.final('hex');
  return crypted;
};

module.exports.decrypt =  function (encriptedText, salt) {
    var decipher = crypto.createDecipher(algorithm, salt),
        dec = decipher.update(encriptedText, 'hex', 'utf8');

    dec += decipher.final('utf8');
    return dec;
};
