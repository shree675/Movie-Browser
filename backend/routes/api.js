const express=require('express');
const router=express.Router();
var Api=require('../models/api.model');

router.route('/getapi').get((req,res)=>{
    Api.find().then((e)=>res.json(e)).catch(err=>res.status(400).json(err));
});

router.route('/setapi').post((req,res)=>{
    const api=req.body.api;
    // console.log(api_key);
    const api_k=new Api({api});
    // console.log(api_k);
    api_k.save().then(()=>res.json('Added new api key!')).catch(err=>res.status(400).json('Error: ' + err));
});

module.exports=router;