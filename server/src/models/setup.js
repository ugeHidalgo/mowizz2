var moongoose = require ('mongoose'),
    Schema = moongoose.Schema,
    SetupSchema = new Schema ({
        id : Number,
        eMail: String,
        password: String,
        salt: String,
        created : { type : Date, default : Date.now },
        updated : { type : Date, default : Date.now }
    });

module.exports = moongoose.model ('Setups', UserSchema);