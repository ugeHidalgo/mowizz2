/*jslint node: true */
'use strict';

module.exports = {
    app : {
        title : 'MoWizz App Server',
        description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
        keywords: 'mongodb, express, angularjs, node.js, mongoose',
        googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
    },
    cors: { //Allow CORS for the given urls
        originsWhitelist: [
            'http://localhost:4200',      //My local front-end url for development.
            'http://192.168.1.25:4200',  //Second CPU front-end url for development also.
            'http://www.myproductionurl.com' //My production front-end url.
        ],
        credentials: true
    },
    db : {
        //uri : 'mongodb://localhost:27017/mowizz2', //DB on local computer
        uri : 'mongodb://192.168.1.25:27017/mowizz2', //DB on local computer
        //uri: 'mongodb://ugeHidalgo:gun12A@ds159036.mlab.com:59036/mowizz2', //DB on mLab
        options: {},
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    //host: process.env.HOST || '0.0.0.0',
    host: process.env.HOST || '192.168.1.25',
    port: process.env.PORT || 3000,

    secure: {
        ssl: true,
        privateKey: './config/sslcerts/key.pem',
        certificate: './config/sslcerts/cert.pem',
        caBundle: './config/sslcerts/cabundle.crt'
    },
    sessionCookie: {
        // session expiration is set by default to 24 hours
        maxAge: 24 * (60 * 60 * 1000),
        // httpOnly flag makes sure the cookie is only accessed
        // through the HTTP protocol and not JS/browser
        httpOnly: true,
        // secure cookie should be turned to true to provide additional
        // layer of security so that the cookie is set only when working
        // in HTTPS mode.
        secure: false
    },
    sessionKey: 'sessionId',
    sessionSecret: process.env.SESSION_SECRET || 'anystringhereisvalidtoencript',
    sessionJsonWebTokenExpires: '10h',
    recoveryMail: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        user: 'trialhambranoreply@gmail.com',
        pass: 'trialhambra12A.g',  //This is not the real password.
        subject: 'Correo de recuperación de cuenta triAlhambra',
        recoveryUrl: 'http://192.168.1.25:4200/recover/'
    }
};