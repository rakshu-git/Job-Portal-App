const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    mobile:{
        type:String
    },
    role:{
        type:String,
          
    }
},{timestamps:true})

userSchema.pre('save', async function(){
    try{
        const count = await User.collection.countDocuments({})
        if(count === 0){
            this.role = "admin"
        }
    }catch(e){
        console.log(e)
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User