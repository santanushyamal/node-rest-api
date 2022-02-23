const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//user get
router.get('/',(req,res,next)=>{
    User.find()
    .then(result => {
        res.status(200).json({
            studentData:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
});

//user get by id
router.get('/:id',(req,res,next)=>{
    User.findById(req.params.id)
    .then(result =>{
        res.status(200).json({student:result});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err})
    })
})

//user create
router.post('/',(req,res,next)=>{
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            res.status(500).json({error:err})
        }else{
            const user = new User({
                _id:new mongoose.Types.ObjectId,
                name:req.body.name,
                email:req.body.email,
                password:hash
            });
            user.save()
            .then(result=>{
                console.log(result);
                res.status(200).json({newStudent:result});
            })
            .catch(error=>{
                console.log(error);
                res.status(500).json({error:error});
            })
        }
    })
});

//user delete by id
router.delete('/:id',(req,res,next)=>{
    User.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({message:"User Deleted",result:result})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    })
})

//user update
router.put('/:id',(req,res,next)=>{
    User.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email
        }
    })
    .then(result =>{
        res.status(200).json({
            message:"product updated",
            user:result
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});
    })

})
//log in
router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            res.status(401).json({msg:"User no exist"})
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                res.status(401).json({err:"Password incorrect"})
            }
            if(result){
                const token = jwt.sign({
                    email:user[0].email,
                    name:user[0].name
                },
                'hello kolkata',
                {
                    expiresIn:"24h"
                });
                res.status(200).json({
                    email:user[0].email,
                    name:user[0].name,
                    token:token
                })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router;