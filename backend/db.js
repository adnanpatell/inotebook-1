const mongoose = require('mongoose');

const mongoUri = "mongodb://localhost:27017/inotebook"
const connecttomongo =() =>{
    mongoose.connect(mongoUri, ()=>{
        console.log("Conected To Mongoose Successfully");
    })
}
module.exports = connecttomongo;