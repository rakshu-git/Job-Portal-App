
const mongoose = require('mongoose');
const Schema=mongoose.Schema

const employerProfileSchema = new Schema({
  companyName: {
    type: String,
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  email: {
    type: String,
  },
  location: {
    type: String,
  },
  industry: {
    type: String,
  },
});

const Employer = mongoose.model('Employer', employerProfileSchema);

module.exports = Employer

