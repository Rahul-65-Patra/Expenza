const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async()=>{

   try{
      await mongoose.connect(process.env.MONGO_URL);
      console.log('Connected to MongoDB server'.bgCyan);
   }
   catch(err){
     console.log('Failed to connect to the MongoDB server'.bgRed);
     process.exit(1);
   }
    
}
module.exports = connectDB