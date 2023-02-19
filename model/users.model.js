const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass : { type: String,  required: true }
}, {
    versionKey: false
})


userSchema.pre('save', function(next) {
    var user = this;
    
    if(!user.isModified("pass")) return next();
    
    const hashpass = bcrypt.hashSync(user.pass, 5);
    user.pass = hashpass;
    
    next();
});
userSchema.methods.comparePasswordhash = function(Userpass, callback) {
    bcrypt.compare(Userpass, this.pass, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel }