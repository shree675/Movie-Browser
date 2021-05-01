const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PreferenceSchema=new Schema({
    username: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        unique: true,
    },
    genre: {
        type: Array,
        required: true,
    }
});

const Preference=mongoose.model('Preference',PreferenceSchema);

module.exports=Preference;