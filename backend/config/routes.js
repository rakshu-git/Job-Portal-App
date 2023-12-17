const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/userController')
const employerController = require('../app/controllers/employerController')
const {checkSchema} = require('express-validator')
const registerationValidationSchema = require('../app/helpers/registerationValidationSchema')
const authenticateUser = require('../app/middlewares/authenticateUser')
const authorizeUser = require('../app/middlewares/authorizeUser')
const seekerController = require('../app/controllers/seekerController')
const jobPostController = require('../app/controllers/jobPostController')
const loginValidationSchema = require('../app/helpers/loginValidationSchema')
const employerValidationSchema = require('../app/helpers/employerValidationSchema')
const jobPostValidationSchema = require('../app/helpers/jobPostValidationSchema')
const seekerValidationSchema = require('../app/helpers/seekerValidationSchema')

//user
router.post('/api/users/register', checkSchema(registerationValidationSchema),usersController.register)
router.post('/api/users/login', checkSchema(loginValidationSchema),usersController.login)
router.get('/api/users/isAdmin',usersController.isAdmin)
router.get('/api/users/account',authenticateUser,usersController.account)

router.get('/api/users',authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin']
    next()
},authorizeUser, usersController.list)

router.get('/api/users/admindata',authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin']
    next()
},authorizeUser, usersController.admindata)

router.delete('/api/users/removeAll',authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin']
    next()
},authorizeUser,usersController.destroyAll)

router.delete('/api/users/:id',authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin']
    next()
},authorizeUser, usersController.destroy)

router.get('/api/users/search',authenticateUser, (req, res, next)=>{
    req.permittedRole = ['admin']
    next()
},authorizeUser, usersController.search)


//employer
router.post('/api/employer', authenticateUser,checkSchema(employerValidationSchema),(req, res, next)=>{
    req.permittedRole = ['employer']
    next()
},authorizeUser, employerController.create)

router.get('/api/employer', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['employer']
    next()
},authorizeUser, employerController.list)

router.put('/api/employer/:id', authenticateUser,checkSchema(employerValidationSchema),(req, res, next)=>{
    req.permittedRole = ['employer']
    next()
},authorizeUser, employerController.update)

router.delete('/api/employer/:id', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['employer']
    next()
},authorizeUser, employerController.destroy)

//seeker
router.post('/api/seeker', authenticateUser,checkSchema(seekerValidationSchema),(req, res, next)=>{
    req.permittedRole = ['jobseeker']
    next()
},authorizeUser, seekerController.create)

router.get('/api/seeker', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['jobseeker']
    next()
},authorizeUser, seekerController.list)

router.put('/api/seeker/:id', authenticateUser,checkSchema(seekerValidationSchema), (req, res, next)=>{
    req.permittedRole = ['jobseeker']
    next()
},authorizeUser, seekerController.update)


router.delete('/api/seeker/:id', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['jobseeker']
    next()
},authorizeUser, seekerController.destroy)

router.get('/api/jobSeekers', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['employer']
    next()
},authorizeUser, usersController.jobSeekers)

router.get('/api/employeeJobPosts', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['employer']
    next()
},authorizeUser, jobPostController.get)

//jobPost
router.post('/api/jobPost', authenticateUser,checkSchema(jobPostValidationSchema),(req, res, next)=>{
    req.permittedRole = ['employer']
    next()
},authorizeUser, jobPostController.create)

router.post('/api/jobPost/:id', authenticateUser,(req, res, next)=>{
    req.permittedRole = ['jobseeker']
    next()
},authorizeUser, jobPostController.add)

router.get('/api/jobPost', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['jobseeker']
    next()
},authorizeUser, jobPostController.list)

router.get('/api/jobPost/list', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['employer','jobseeker']
    next()
},authorizeUser, jobPostController.listSpec)

router.get('/api/jobPost/search', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['jobseeker']
    next()
},authorizeUser, jobPostController.search)

router.put('/api/jobPost/:id', authenticateUser,checkSchema(jobPostValidationSchema),(req, res, next)=>{
    req.permittedRole = ['employer']
    next()
},authorizeUser, jobPostController.update)

router.put('/api/jobPost/applicant/:id/:applicantId', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['employer']
    next()
},authorizeUser, jobPostController.edit)

router.delete('/api/jobPost/:id', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['employer']
    next()
},authorizeUser, jobPostController.destroy)

router.delete('/api/jobApplicant/:id/:applicantId', authenticateUser, (req, res, next)=>{
    req.permittedRole = ['employer']
    next()
},authorizeUser, jobPostController.removeId)

module.exports=router