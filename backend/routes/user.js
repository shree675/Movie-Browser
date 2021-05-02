const express=require('express');
const router=express.Router();
var User=require('../models/user.model');

router.route('/login/submituser').get((req,res)=>{
    User.find().then((e)=>res.json(e)).catch(err=>res.status(400).json('notfound'));
});

router.route('/signin/createuser').post((req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    // console.log(username);
    const user=new User({username,password});
    user.save().then(()=>res.json('Added new user!')).catch(err=>res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id).then(user => {

    user.username=req.body.username;
    user.password=req.body.password;

    user.save().then(() => res.json('Password updated!')).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports=router;