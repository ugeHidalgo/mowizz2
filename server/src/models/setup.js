var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    SetupSchema = new Schema ({
        id : Number,
        recoveryMail: String,
        recoveryMailPassword: String,
        salt: String
    });

module.exports = moongoose.model ('Setups', SetupSchema);