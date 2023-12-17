
const employerValidationSchema = {
    companyName: {
        notEmpty:{
            errorMessage:"Company Name is required"
        }
    },
    email:{
        notEmpty:{
            errorMessage:"email is required"
        },
        isEmail:{
            errorMessage:"email format is invalid"
        },
        
    },
    location:{
        notEmpty:{
            errorMessage: 'Location is required'
        }
    },
    industry:{
        notEmpty:{
            errorMessage: 'Industry is required'
        }
    }
    
}

module.exports = employerValidationSchema