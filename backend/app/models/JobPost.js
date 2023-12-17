
const mongoose = require('mongoose');
const Schema=mongoose.Schema

const jobPostSchema = new Schema({
  companyName:{
    type:String
  },
  designation: {
    type: String,
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  location:{
    type:String
  },
  salary:{
    type:String
  },
  requiredExperience:{
    type:String
  },
  applicants:[
    {
      applicant: {
        type: Schema.Types.ObjectId,
        ref: 'Seeker',
      },
      status: {
        type: String,
        enum: ['pending', 'accept', 'reject'],
        default: 'pending',
      },
    },
  ]
})

const JobPost = mongoose.model('JobPost', jobPostSchema);

module.exports = JobPost

