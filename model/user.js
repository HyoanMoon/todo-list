const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require ('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


const userSchema = Schema({
    name : {
        type: String,
        required: true,
    
    },
    email : {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                if(!validator.isEmail(value))
                    throw new Error('이메일 형식이 아닙니다.')
            },
        },
    },
    password: {
        type: String,
        required: true,
        
    },
},{
    timestamps: true
}
);
userSchema.methods.toJSON =function(){
    const obj =  this._doc;
    delete obj.password;
    return obj
}; // 언제든지 be -> fe 로 데이터를 보낼때 항상 저렇게 호출이 된다!!!!! 

userSchema.methods.generateToken = function(){
   const token = jwt.sign({ _id : this._id }, JWT_SECRET_KEY,{expiresIn : '20h'});
   return token; 
};

const User = mongoose.model("User",userSchema);

module.exports = User;

