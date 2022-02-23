const express = require('express');
const app = express();
const userRoute = require('./api/routes/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb+srv://root:santanu@cluster0.toks7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log('Connection field');
});
mongoose.connection.on('connected',connected=>{
    console.log('Connect with data base ...');
});


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/user', userRoute);

app.use((req,res,next)=>{
    res.status(404).json({
        error:'Bad request'
    });
});
module.exports = app;