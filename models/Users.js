const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        tyle: Number,
        default:0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number, 
    },
})

//save function 시작 전 할일 정해주기,  mongodb function
userSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')) {
        //비밀번호 암호화 
        //arrow function안되는 이유?
        bcrypt.genSalt(saltRounds, function(err,salt) {
            if(err) return next(err);

            bcrypt.hash(user.password,salt,(err,hash)=>{
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(planePassword, cb){
    //plainPassword 1234567  ==   암호화된 비밀번호 뭐시기
    //입력한 비밀번호를 암호화 시키는 게 맞다.
    bcrypt.compare(planePassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    //jsonwebtoken을 이용해서 토큰을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function( token, cb) {
    var user = this;
    //token decode
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이 일치하는지 확인.
        user.findOne({"_id":decoded, "token" : token}, function(err,user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = {User};
