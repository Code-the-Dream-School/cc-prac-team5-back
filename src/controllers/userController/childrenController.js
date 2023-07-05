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

//Upload the picture and update the field

const multerStorage = multer.memoryStorage();

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
    // const filename = `child-${req.user.id}-${Date.now().jpeg}`;// first mistake
    const filename = `child-${req.user.id}-${Date.now()}.jpeg}`;
    //Resize uploaded image
    // await sharp(req.file.sharp)-second mistake
    await sharp(req.file.buffer)
      .resize(500) // desired width or height
      .toFormat('jpeg')
      .jpeg({  quality: 90 }) // desired quality
      .toFile(`public/img/children/${filename}`);
      
    // req.file.path = `public/img/children/${filename}`;
    req.file.path = `/img/children/${filename}`;
    req.file.filename = filename;
    
    console.log(req.file)
    
    next();
});
   
exports.updateMe = catchAsync(async (req, res, next) => {
    //child should not update PIN here
    if(req.body.pin) {
        return next(new CustomAPIError('Please use update my PIN'), 400);
    }
    
    const updatedChild = await Children.findByIdAndUpdate(
        req.user.id,
        { image: req.file.path  },
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

exports.getAllChildren = catchAsync( async (req, res, next) => {
    const children = await Children.find();
    
    
    res.status(200).json({ 
        status: 'success',
        data: {
            data: children,
            count: children.length
        }
    });
    next();
});


exports.getChildById = catchAsync( async(req, res, next) => {
    const child = await Children.findById(req.params.id);
    
    if (!child) {
        return next(new CustomAPIError('Could not find child by given id', 400));
    }
    
    res.status(200).json({ 
        status: 'success',
        data: {
            data: child
        }
    });
    next();
});

exports.editChild = catchAsync(async (req, res, next) => {
    const updatedChild = await Children.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    if (!updatedChild) {
        return next(new CustomAPIError('Could not update child by given id', 400));
    }
    
    res.status(200).json({ 
        status: 'success',
        data: {
            data: updatedChild
        }
    });
    next();
    
});

exports.deleteChild = catchAsync(async (req, res, next) => {
    const child = await Children.findByIdAndRemove(req.params.id)
    
    if (!child) {
        return next(new CustomAPIError('Could not delete selected child', 400));
    }
    
    res.status(200).json({ 
        status: 'success',
        data: null,
    });
    next();
    
});