const express =require ('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
require('dotenv').config()
const roots =require('./roots/root')

const corsOptions={
  origin:['http://localhost:5173',process.env.CLIENT_URL].filter(Boolean),
  methods:['GET','PUT','PATCH','DELETE','POST'],
}



app.use(express.json())
app.use(cors(corsOptions))
app.use('/api',roots)



mongoose.connect(process.env.MONGODB_URI).then(()=>{
app.listen(process.env.PORT,()=>(console.log(`Server run at Port:${process.env.PORT}`)))
}).catch((err)=>{console.log(`DB Not Connected:${err}`)})
