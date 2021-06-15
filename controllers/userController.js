const multer = require("multer"); 
const sharp = require("sharp"); 
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

exports.updateUser = catchAsync(async (req, res, next) => {
    console.log(req.user.id);
    
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      photo: req.file.filename ? req.file.filename : "default.jpg",
    },
    {
      new: true,
 
    }
  );
  if(!updateUser){
      return next(new AppError("This is user is not found"), 401); 
  }
  res.status(200).json({
      status: "success", 
      updateUser
  })
});

const multerStorage = multer.memoryStorage(); 
const multerFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith("image")){
        cb(null, true); 
    } else{
        cb(new AppError("Not an Image!, Please upload only images", 400), false); 
    }
}

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single('photo');

exports.rezizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `user-${req.user.id}.jpeg`;
  
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);
  
    next();
  });
  