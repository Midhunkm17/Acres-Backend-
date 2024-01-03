const mongoose=require('mongoose')

//schema

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true 
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true,
        
    },
    profileImage:{
        type:String
    },
    place:{
  type:String
    },
    phoneNum:{
        type:Number
    }
})

const Users= mongoose.model('Users',userSchema)

module.exports=Users;