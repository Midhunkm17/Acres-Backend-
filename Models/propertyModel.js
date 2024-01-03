const mongoose=require('mongoose')


const propertySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    contactNum:{
        type:Number,
        required:true
    },
    propertyImg:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const properties=new mongoose.model('properties',propertySchema)
module.exports=properties