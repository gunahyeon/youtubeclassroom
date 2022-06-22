const { User } = require("../models/Users");

let auth = (req, res, next) => {
    //인증 처리를 하는 곳
    //get token from client cookie
    let token = req.cookies.x_auth;
    //decode token and find user
    User.fineByToken(token, (err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth:false, error:true});
    })
    req.token = token;
    req.user = user;
    next();
    //if user, auth ok
    //if !user, auth fail
}
module.exports = {auth};