
const { validationResult } = require("express-validator")
const JobPost = require("../models/JobPost")

const jobPostController = {}

jobPostController.create = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{    
        const body=req.body
        const userId=req.user.id
        const jobPostObj=new JobPost(body)
        jobPostObj.userId=userId           
        const jobPost=await jobPostObj.save()
        res.json(jobPost)
    }catch(e){
        res.status(500).json(e)
    }
}

jobPostController.list = async (req, res) =>{
    try{
        const jobPost = await JobPost.find()
        res.json(jobPost)
    }catch(e){
        res.status(500).json(e)
    }
}

jobPostController.listSpec = async(req,res)=>{
    try{
         const userId=req.user.id
        const jobPost = await JobPost.find({userId:userId})
        res.json(jobPost)
    }catch(e){
        res.status(500).json(e)
    }
}

jobPostController.update = async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{
        const body = req.body
        const id = req.params.id
        const jobPost = await JobPost.findByIdAndUpdate(id,body,{new:true, runValidators:true})
        res.json(jobPost)
    }catch(e){
        res.status(500).json(e)
    }   
}

jobPostController.destroy = async(req, res) =>{
    try{
        const id = req.params.id
        const jobPost = await JobPost.findByIdAndDelete(id)
        res.json(jobPost)
    }catch(e){
        res.status(500).json(e)
    }
}

jobPostController.add = async (req,res) =>{
    try{
       const id = req.params.id
       const status = req.body.status 
       const jobPost = await JobPost.findOneAndUpdate({_id:id}, {
        $push: {
          applicants: {
            applicant: req.user.id,
            status: status,
          },
        },
      },{new:true})
       res.json(jobPost)
    }catch(e){
        res.status(500).json(e)
    }
}

jobPostController.edit = async (req,res) =>{
    const id = req.params.id;
    const applicantId = req.params.applicantId;
    const status=req.body.status
  
    try {
      const job = await JobPost.findById(id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      const applicant = job.applicants.find(app => app._id.toString() === applicantId);
      if (!applicant) {
        return res.status(404).json({ message: 'Applicant not found for this job' });
      }
      applicant.status = status
      await job.save()
      const response = await JobPost.findById(id).populate({
        path: 'applicants.applicant',
        model: 'User',
        select: 'username email mobile ',
      })
  
      res.json(response)
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
}



jobPostController.removeId = async (req,res) =>{
    try{
       const id = req.params.id
       const applicantId = req.params.applicantId
       const jobPost = await JobPost.findById(id)
       jobPost.applicants = jobPost.applicants.filter(ele=>ele._id!=applicantId)
       await jobPost.save()
       res.json(jobPost)
    }catch(e){
        res.status(500).json(e)
    }
}

jobPostController.get = async(req,res) =>{
    try{
        const jobPost = await JobPost.find({userId:req.user.id}).populate({
            path: 'applicants.applicant',
            model: 'User',
            select: 'username email mobile ',
          })
        res.json(jobPost)
    }
    catch(e){
        res.status(500).json(e)
    }
}

jobPostController.search = async (req, res) =>{
    const { search } = req.query
    try{
        if(search.length==0){
            const jobs = await JobPost.find()
            res.json({items:jobs})
        }else{
            const regex = new RegExp(search, 'i');
            const items = await JobPost.find({
                $or: [
                  { location: { $regex: regex } },
                  { salary: { $regex: regex } },
                  { designation: { $regex: regex } },
                  { companyName: { $regex: regex } },
                  { requiredExperience: { $regex: regex } }
                ]
              }).exec();
          
              res.json({ items });
        }
       
    }catch(e){
        res.status(500).json(e)
    }
}


module.exports = jobPostController