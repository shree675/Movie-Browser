const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const apiSchema=new Schema({
    api: {
        type: String,
        required: true
    }
});

const Api=mongoose.model('Api',apiSchema);
module.exports=Api;