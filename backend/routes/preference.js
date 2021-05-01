const express=require('express');
const router=express.Router();
var Preference=require('../models/preference.model');

router.route('/allpreferences').get((req,res)=>{
    Preference.find().then((e)=>res.json(e)).catch(err=>res.status(400).json('notfound'));
});

router.route('/createpreference').post((req,res)=>{
    const username=req.body.username;
    const genre=req.body.genre;
    const pref=new Preference({username,genre});
    pref.save().then(()=>res.json('Added new preference!')).catch(err=>res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Preference.findById(req.params.id).then(pref => {

    pref.username=req.body.username;
    pref.genre=req.body.genre;
    pref.save().then(() => res.json('Genre updated!')).catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports=router;