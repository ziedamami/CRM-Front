
const router = require('express').Router();
const User= require('../models/Seller')
router.post('/login',(req,res)=>{

const connecteduser= User.findOne({username:req.body.username,password:req.body.password})
.then(user=>{
if(!user){
    return res.status(400).send("user not existe !")
}
res.send(user)
})
});

module.exports= router;