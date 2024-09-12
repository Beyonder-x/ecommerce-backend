const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
// app.use(cors());
app.use('/images', express.static('images'));
app.use(express.json()) // to parse the body of request ohterwise we have to ue JSON.parse(body)
app.use(cookieParser())

app.use("/api",router)

const PORT =  process.env.PORT || 8080 



    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })

