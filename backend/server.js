const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const connectDB = require('./config/connectDB');
// rest object
const app = express();  

//config dotenv file
dotenv.config();

// Database call
connectDB();

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// routes

// user routes
app.use('/api/v1/users',require('./routes/userRoute'))

// transections routes
app.use('/api/v1/transections',require('./routes/transectionRoutes'))

//static files

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})


//port
const PORT = 8000 || process.env.PORT 

//listen

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`.yellow.bold);
})