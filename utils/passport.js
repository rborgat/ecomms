const passport = require("passport"); 
const LocalStrategy = require("passport-local").Strategy; 
const AppError = require("../utils/appError"); 
const User = require('../models/userModel')

 

const verifyUser = async(username, password, done) =>{
    
    const user = await User.findOne({$or: [{username: username}, {email: username}]}).select(('+password'));
    
    
    if(!user || !(await user.correctPassword(password, user.password))){
        return done(new AppError("Incorrect password or email", 401), false);
    }
    return done(null, user); 
}; 

const strategy = new LocalStrategy(verifyUser);

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id); 
})
passport.deserializeUser(async(userId, done)=>{
    try{
       const user =  await User.findById(userId); 
       done(null, user); 
    }catch(err){
        done(err); 
    }
  
})
//module.exports = strategy; 