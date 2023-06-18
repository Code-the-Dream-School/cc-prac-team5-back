const multer = require('multer');
const CustomAPIError = require("../../error-handlers/custom-api");
const catchAsync = require("../../utils/catchAsync");
const Children = require('../../models/childrenModel');
const sharp = require('sharp');

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => { //cb function is like next function in express
//         cb(null, 'public/img/children');
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// });

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => { //cb function is like next function in express
        cb(null, 'public/img/children');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new CustomAPIError('Please upload an image file'), false);
    }
  }

const upload = multer({
    storage: multerStorage,
    fileFilter,
});

exports.uploadImage = upload.single('image');


exports.resizeUploadedImage = catchAsync(async (req, res, next) => {
    if(!req.file) return next();
    
    //create unique filename
    const filename = `child-${req.user.id}-${Date.now().jpeg}`;
    
    //Resize uploaded image
    await sharp(req.file.sharp)
      .resize(500) // desired width or height
      .toFormat('jpeg')
      .jpeg({  quality: 90 }) // desired quality
      .toFile(`public/img/children/${filename}`);
      
    req.file.path = `public/img/children/${filename}`;
    req.file.filename = filename;
    
    next();
});
   
exports.updateMe = catchAsync(async (req, res, next) => {
    //child should not update PIN here
    if(req.body.PIN) {
        return next(new CustomAPIError('Please use update my PIN'), 400);
    }
    
    const updatedChild = await Children.findByIdAndUpdate(
        req.body.id,
        { image: req.file.filename  },
        { new: true, }
        );
 
        
        if(!updatedChild) {
            return next(new CustomAPIError('No user with that ID was found', 404));
        }
    
    res.status(200).json({
        status: 'success',
        data: {
            Children: updatedChild
        }
    });
});

exports.getAllChildren = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        message: 'This route has not been defined.'
    });
};


exports.getChildById = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        message: 'This route has not been defined.'
    });
};

exports.editChild = catchAsync(async (req, res, next) => {
    if(req.body.password){
        return next (new CustomAPIError('Cannot update password via this route. 400'))
    }
});

exports.deleteChild = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        message: 'This route has not been defined.'
    });
};

//Child logs on
//views current assigned tasks
//mark task as completed
//can view past tasks
//view awards and points