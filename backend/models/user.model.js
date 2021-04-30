const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    username: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 1,
        required: true,
        unique: true,
    }
},
{
    timestamps: true,
});

const User=mongoose.model('User',UserSchema);

module.exports=User;