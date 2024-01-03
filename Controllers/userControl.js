const jwt = require('jsonwebtoken')
const Users = require('../Models/Usermodel')
const properties = require('../Models/propertyModel')

exports.signup = async (req, res) => {
    const { userName, email, password } = req.body

    try {
        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            res.status(400).json("User already exists! Please login to continue..")
        }
        else {
            const newUser = new Users({
                userName, email, password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json(`Sign Up Api Failed ${err}`)
    }
}


//login
exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const loggedUser = await Users.findOne({ email, password })
        if (loggedUser) {
            //token
            const token = jwt.sign({ _id: loggedUser._id }, "m17")
            res.status(200).json({
                user: loggedUser,
                token

            })
        }
        else {
            res.status(404).json("Incorrect email or password")
        }
    }
    catch (err) {
        res.status(401).json(`Login Api Failed ${err}`)
    }
}

//update profile
exports.updateProfile = async (req, res) => {
    const { userName, phoneNum, place, profileImage } = req.body
    const { _id } = req.params
    //image from multer
    const profile = req.file ? req.file.filename : profileImage

    try {
        const selectedUser = await Users.findOne({ _id })
        if (selectedUser) {
            selectedUser.userName = userName
            selectedUser.phoneNum = phoneNum
            selectedUser.profileImage = profile
            selectedUser.place = place

            await selectedUser.save()
            res.status(200).json(selectedUser)
        }
        else {
            res.status(404).json(`${userName} not present`)
        }

    }
    catch (err) {
        res.status(401).json(`Profile Update Api Failed ${err}`)
    }

}

//add-property
exports.addProperty = async (req, res) => {
    const { name, description, address, bedrooms, bathrooms, price,contactNum } = req.body

    const propertyImg = req.file?.filename

    //from jwt middleware
    const userId = req.payload

    try {
        const existingProperty = await properties.findOne({ name })
        if (existingProperty) {
            res.status(400).json(`${existingProperty.name} already exists!`)
        }
        else {
            const newProperty = new properties({
                name, description, address, bedrooms, bathrooms, price,contactNum, propertyImg, userId
            })
            await newProperty.save()
            res.status(200).json(newProperty)
        }
    }
    catch (err) {
        res.status(401).json(`Property Add Api Failed ${err}`)

    }
}

//get user property uploads
exports.userProperty = async (req, res) => {
    const { id } = req.params
    try {
        const userPropertiesArray = await properties.find({ userId: id })
        if (userPropertiesArray) {
            res.status(200).json(userPropertiesArray)
        }
        else {
            res.status(400).json("No Property uploaded yet!")
        }

    }
    catch (err) {
        res.status(401).json(`Property get Api Failed ${err}`)

    }
}

//get all properties
exports.allProperties = async (req, res) => {

    //access query data
    const searchQuery = req.query.search
    const query = {
        address: { $regex: searchQuery, $options: 'i' }
        
    }
    try {
        //regex query

        const allPropertiesArray = await properties.find(query)
        if (allPropertiesArray) {
            res.status(200).json(allPropertiesArray)
        }
        else {
            res.status(400).json("No Properties available")
        }
    }
    catch (err) {
        res.status(401).json(`Property get Api Failed ${err}`)

    }
}

//get some properties at homepage
exports.homeProperties = async (req, res) => {
    try {
        const homePropertiesArray = await properties.find().limit(3)
        if (homePropertiesArray) {
            res.status(200).json(homePropertiesArray)
        }
        else {
            res.status(400).json("No Properties available")
        }
    }
    catch (err) {
        res.status(401).json(`Property get Api Failed ${err}`)

    }
}

//edit property details
exports.editProperty = async (req, res) => {
    const { name, description, address, bedrooms, bathrooms, price,contactNum, propertyImg } = req.body
    const { _id } = req.params
    const uploadImg = req.file ? req.file.filename : propertyImg
    try {
        const updatedProperty = await properties.findByIdAndUpdate({ _id }, { name, description, address, bedrooms, bathrooms, price,contactNum, propertyImg: uploadImg }, { new: true })
        await updatedProperty.save()
        res.status(200).json(updatedProperty)

    }
    catch (err) {
        res.status(401).json(`Property edit Api Failed ${err}`)
    }
}

//delete property
exports.deleteProperty = async (req, res) => {
    const { _id } = req.params
    try {
        const property = await properties.deleteOne({ _id })
        if (property) {
            res.status(200).json("Property deleted!")
        }
    }
    catch (err) {
        res.status(401).json(`Property delete Api Failed ${err}`)
    }
}

//get specified property
exports.getSpecifiedProperty=async(req,res)=>{
    const {_id}=req.params

    try{
const specifiedProperty= await properties.findOne({_id})
if(specifiedProperty){
    res.status(200).json(specifiedProperty)
}
else{
    res.status(400).json("No Property found")
}
    }
    catch(err){
        res.status(401).json(`Property get Api Failed ${err}`)
    }
}