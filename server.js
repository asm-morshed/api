const express = require('express')
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');

// routes 
const salesRoutes = require('./api/routes/salesuser');



app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors());


// Connect with mongo
mongoose.connect('mongodb://localhost:27017/empInfo')
    .then(res=> console.log("Database is connected"))
    .catch(err=>console.log("Error during connecting Database: ", err))




// CORS 
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,  X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
})

// use routes
app.use('/api/routes/salesuser',salesRoutes);

const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.status(200).json({
        message: 'Hello from user creation'
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})    