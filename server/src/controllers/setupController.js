/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var setupManager = require('../managers/setupManager'),
    config = require('../../config/config'),
    auth = require ('../auth/authMiddleware'),
    hasher = require('../auth/hasher');

/**
 * Public methods.
 */
module.exports.init = function (app) {
    app.get ('/api/setup', auth.isUserAuthenticated, function (req, res, next) {
        // (GET)http:localhost:3000/api/setup
        var msg;

        setupManager.getSetup ( function(error, setup){
            if (error){
                console.log('Setup controller returns an error (400)');
                res.status(400).send(error);
            } else {
                res.set('Content-Type','application/json');
                if (setup.length === 0 ) {
                    msg = 'No setup found';
                    console.log(msg);
                    res.status(200).send([msg]);
                } else {
                    console.log('Setup controller returns setup successfully.');
                    setup[0].salt = '';
                    setup[0].pass = '';
                    res.status(200).send(setup[0]);
                }
            }
        });
    });

    // Creates or updates a setup.
    // (POST)http:localhost:3000/api/setup body: {recoveryMail: 'a mail', recoveryPassword:'pass', ...}
    app.post('/api/setup', function(request, response, next){

      var setupToUpdate =  request.body;

      setupManager.saveSetup ( setupToUpdate, function(error, updatedSetup){
           if (error){
              response.status(400).send('Failed to save setup: ' + error);
          } else {
              response.set('Content-Type','application/json');
              response.status(201).send(updatedSetup);
           }
      });
    });

    setupManager.getSetup(function(error, setup){
        var pass;

        if (error){
            console.log('Setup controller returns an error (400)');
        } else {
            if (setup.length === 0 ) {
                console.log('No setup found');
            } else {
                console.log('Setup controller returns setup successfully.');
                //pass = hasher.decrypt(setup[0].recoveryMailPassword, setup[0].salt)
                config.recoveryMail.user = setup[0].recoveryMail;
                //config.recoveryMail.pass = pass;
                config.recoveryMail.pass = setup[0].recoveryMailPassword;
                config.recoveryMail.salt = setup[0].salt;
            }
        }
    });
    console.log('Setup controller initialized');
};
