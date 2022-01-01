const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://raj:1234@cluster0.ytz37.mongodb.net/iNotebook?retryWrites=true&w=majority'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connection Successfull");
    })
}
module.exports = connectToMongo;