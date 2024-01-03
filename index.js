//load .env file
require('dotenv').config()


const express=require('express')

const cors=require('cors')

const routes=require('./Routes/routes')

require('./db/connection')

const realestateServer=express()

//export uploadedFiles folder to client
realestateServer.use('/uploadedFiles',express.static('./uploadedFiles'))

realestateServer.use(cors())

realestateServer.use(express.json())

realestateServer.use(routes)

const PORT=9000 || process.env.PORT
realestateServer.listen(PORT,()=>{
    console.log(`__Server started at Port : ${PORT}`);
})

