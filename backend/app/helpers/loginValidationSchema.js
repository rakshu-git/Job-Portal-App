
const loginValidationSchema={
  email:{
      notEmpty:{
        errorMessage:"email is required"
      },
      isEmail:{
        errorMessage:"invalid email format"
      }
  },
  password:{
    notEmpty:{
        errorMessage: 'password is required'
    },
    isStrongPassword:{
        errorMessage: 'password is not strong enough'
    }
  }
}
module.exports = loginValidationSchema