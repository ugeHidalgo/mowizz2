/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require ('mongoose'),
    config = require('../../config/config'),
    hasher = require ('../auth/hasher'),
    Setup = require ('../models/setup'),
    User = require ('../models/user');

/**
 * Public methods.
 */
module.exports.getSetup = function (callbackFn) {
    Setup.find({}, callbackFn);
};

module.exports.saveSetup = function (setup, callbackFn) {

    Setup.find({},(error, data) => {
      if (data.length > 0) {
        updateSetup(setup, callbackFn);
      } else {
        createNewSetup(setup, callbackFn);
      }
    });
};

/**
 * Private methods.
 */
function createNewSetup (setup, callbackFn){
    var newSetup = new Setup(setup),
    salt = hasher.createSalt();

    newSetup.recoveryMailPassword = hasher.encrypt(setup.recoveryMailPassword, salt);
    newSetup.salt = salt;

    newSetup.save(function (error) {
        if (error) {
            callbackFn(error, null);
        } else {
            updateSetupOnConfigData(newSetup);
            console.log ('New setup created and saved');
            callbackFn(null, newSetup);
        }
    });
};

function updateSetup (setup, callbackFn) {

    var salt = hasher.createSalt(),
        updatedValues = {
          recoveryMail: String,
          recoveryMailPassword: String,
    };

    updatedValues.recoveryMail = setup.recoveryMail;
    updatedValues.recoveryMailPassword = hasher.encrypt(setup.recoveryMailPassword, setup.salt);
    updatedValues.salt = setup.salt;

    User.findOneAndUpdate(
    {},
    { $set: updatedValues },
    function (error, updatedSetup){
        if (error){
            callbackFn(error, null);
        } else {
            updateSetupOnConfigData(updatedSetup[0]);
            console.log ('Setup data updated successfully');
            callbackFn(null, setup)
        }
    });
};

function updateSetupOnConfigData (setup) {
    var pass = hasher.decrypt(setup.recoveryMailPassword, setup.salt);

    config.recoveryMail.user = setup.recoveryMail;
    config.recoveryMail.pass = pass;
}