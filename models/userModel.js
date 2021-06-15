const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter an email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide a username"],
    minlength: 6,
  },

  password: {
    type: String,
    required: [true, "Please provide a password "],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same",
    },
  },
  photo: {
      type: String,
      default: "default.jpg"
  }
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next(); 

    this.password = await bcrypt.hash(this.password, 12); 

    this.passwordConfirm = undefined; 
    next(); 
})

 
userSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
