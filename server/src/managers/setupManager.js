/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config'),
    hasher = require ('../auth/hasher'),
    Setup = require ('../models/setup');

/**
 * Public methods.
 */
module.exports.getSetup = function (callbackFn) {
    Setup.find({}, callbackFn);
};

module.exports.saveSetup = function (setupToBeSaved, callbackFn) {

    Setup.find({},(error, existingSetup) => {
      if (existingSetup.length > 0) {
        setupToBeSaved.salt = existingSetup[0].salt;
        updateSetup(setupToBeSaved, callbackFn);
      } else {
        createNewSetup(setupToBeSaved, callbackFn);
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

    var updatedValues = {
          recoveryMail: String,
          recoveryMailPassword: String,
    };

    updatedValues.recoveryMail = setup.recoveryMail;
    updatedValues.recoveryMailPassword = hasher.encrypt(setup.recoveryMailPassword, setup.salt);

    Setup.findOneAndUpdate(
    {},
    { $set: updatedValues },
    function (error, updatedSetup){
        if (error){
            callbackFn(error, null);
        } else {
            updateSetupOnConfigData(updatedSetup);
            console.log ('Setup data updated successfully');
            callbackFn(null, updatedSetup)
        }
    });
};

function updateSetupOnConfigData (setup) {
    var pass = hasher.decrypt(setup.recoveryMailPassword, setup.salt);

    config.recoveryMail.user = setup.recoveryMail;
    config.recoveryMail.pass = pass;
}