const router = require("express").Router();
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");

const bucket = process.env.AWS_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({ accessKeyId, secretAccessKey });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket,
    ACL: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

router.post("/upload", upload.array("image", 1), function (req, res, next) {
  if (!req.files) {
    res.status(500).json({
      status: "fail",
      message: "Error: No File Selected",
    });
  } else {
    // If Success
    let fileArray = req.files,
      fileLocation;
    // images array with locations urls
    const images = [];
    for (let i = 0; i < fileArray.length; i++) {
      fileLocation = fileArray[i].location;
      images.push(fileLocation);
    }
    return res.status(200).json({
      status: "ok",
      locationArray: images,
    });
  }
});

module.exports = router;
