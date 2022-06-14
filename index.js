const express = require("express");
const app = express();
const port = 5001;
const mongoose = require("mongoose");
const { User } = require("./models/Users");
const bodyParser = require("body-parser");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://gunahyeon:1111@lecture-project.cnj0j7y.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(()=>console.log("MongoDB connected..."))
  .catch(err => console.log(err));
app.get('/', (req, res) => res.send("ddf"))
app.post('/register', (req,res)=>{
    //회원가입때 필요한 정보 client에서 가져오고 DB에 넣어주기.
    const user = new User(req.body);
    //mongodb function
    user.save((err,userInfo)=>{
        if(err) return res.json({success:false, err});
        return res.status(200).json({
            success: true,
        });
    });
})
app.listen(port, () => console.log(`example app listening on port ${port}`));