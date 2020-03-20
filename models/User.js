const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
require('dotenv').config();

const Schema = mongoose.Schema;
const userSchema = new Schema({
        username :{type: String , required: true , maxlength:20, trim:true},
        email : {type: String, required: true, maxlength: 50, trim: true},
        password : {type:String, trim:true}
    },
    {

        timestamps: {createdAt: "created_at", updateAt: "updated_at"}
    }
);

userSchema.pre('save' ,async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
userSchema.methods.generateAuthToken = async ()=>{
    const user=this;
    const token = jwt.sign({_id: user._id} , process.env.JWK_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
};

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error()
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error()
    }
    return user
};

const User = mongoose.model('User', userSchema);

module.exports =User;