const cors=require('cors');
const mongoose=require('mongoose');
const express=require('express');
require('dotenv').config();

const app=express();
const port=process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const uri=process.env.ATLAS_URI1;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB connection established successfully');
});

const userRouter=require('./routes/user');
const prefRouter=require('./routes/preference');
const apiRouter=require('./routes/api');

app.use('/',userRouter);
app.use('/pref',prefRouter);
app.use('/api',apiRouter);

app.listen(port, ()=>{
    console.log('Server is running on port: ',port);
});