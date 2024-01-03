const mongoose=require('mongoose')

const connectionString=process.env.MONGO 

mongoose.connect(connectionString).then(()=>{
    console.log("__MongoDB Connected__");
}).catch((err)=>{
    console.log(`__MongoDB Connection Failed ! ${err}__`);
})