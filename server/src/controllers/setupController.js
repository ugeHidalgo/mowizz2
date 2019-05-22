/*jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var setupManager = require('../managers/setupManager'),
    auth = require ('../auth/authMiddleware');

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

    console.log('Setup controller initialized');
};
