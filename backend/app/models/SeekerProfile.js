
const mongoose = require('mongoose');
const Schema=mongoose.Schema

const seekerProfileSchema = new Schema({
  name: {
    type: String,
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  qualification:{
    type:String
  },
  experience:{
    type:String
  },
  designation:{
    type:String
  }
})

const Seeker = mongoose.model('Seeker', seekerProfileSchema);

module.exports = Seeker

