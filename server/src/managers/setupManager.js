/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require ('mongoose'),
    hasher = require ('../auth/hasher'),
    Setup = require ('../models/setup');

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

    newSetup.recoveryMailPassword = hasher.computeHash(setup.recoveryMailPassword, salt);
    newSetup.salt = salt;

    newSetup.save(function (error) {
        if (error) {
            callbackFn(error, null);
        } else {
            console.log ('New setup created and saved');
            callbackFn(null, newSetup);
        }
    });
};

function updateSetup (setup, callbackFn) {

    var salt = hasher.createSalt(),
        updatedValues = {
          id : Number,
          recoveryMail: String,
          recoveryMailPassword: String,
          salt: String
    };

    updateSetup.id = setup.id;
    updatedValues.recoveryMail = setup.recoveryMail;
    updatedValues.recoveryMailPassword = hasher.computeHash(setup.recoveryMailPassword, salt);
    updatedValues.salt = salt;

    User.findOneAndUpdate(
    {},
    { $set: updatedValues },
    function (error){
        if (error){
            callbackFn(error, null);
        } else {
            console.log ('Setup data updated successfully');
            callbackFn(null, setup)
        }
    });
};