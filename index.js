const express = require("express");
const app = express();
const port = 5001;

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://gunahyeon:1111@lecture-project.cnj0j7y.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(()=>console.log("MongoDB connected..."))
  .catch(err => console.log(err));
app.get('/', (req, res) => res.send("hi"))
app.listen(port, () => console.log(`example app listening on port ${port}`));