const transectionModel = require("../config/models/transectionModel");
const moment = require("moment");


const getAllTransection = async(req,res)=>{
    try{
      const {frequency,selectedDate,type}  = req.body;
      const transections = await transectionModel.find({
          ...(frequency!=='custom' ? {    // custom ka liya
            date:{
               $gt:moment().subtract(Number(frequency),"d").toDate(),  // 'd' means "Day" 
             },
          } :{
              date:{
               $gte:selectedDate[0],
               $lte:selectedDate[1],
              }
          }),
          ...(type!=="all" && {type}),   // type ka liya
         userid:req.body.userid,
      });
      res.status(200).json(transections);
    }
    catch(error){
      res.status(500).json({message:'Failed to get transection', error})
      console.log(error);
      process.exit(1);
     }
}

const editTransection =async(req,res)=>{
   try{
       await transectionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload);
       res.status(200).json({message:'Transection Edit successfully'})
   }
   catch(error){
      res.status(500).json({message:'Failed to edit transection', error})
      console.log(error);
      process.exit(1);
   }
}

const deleteTransection =async(req,res)=>{
   try{
       await transectionModel.findOneAndDelete({_id:req.body.transactionId});
       res.status(200).json({message:'Transection Delete successfully'})
   }
   catch(error){
      res.status(500).json({message:'Failed to delete transection', error})
      console.log(error);
      process.exit(1);
   }
}

const addTransection =async(req,res)=>{

   try{
      const newTransection = new transectionModel(req.body);
      await newTransection.save();  
      res.status(200).json({message:'Transection Add successfully'})
   }
   catch(error){
    res.status(500).json({message:'Failed to add transection', error})
    console.log(error);
    process.exit(1);
   }
}

module.exports = {getAllTransection,addTransection,editTransection,deleteTransection}