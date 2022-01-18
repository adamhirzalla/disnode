// REFERENCE FOR USING MULTER WITHOUT MULTER-S3

// -> this receives the file in binary from client, then uploads it to
// s3 bucket and on return, it sends the key location for that image, which
// can be used to make a request to server with that key in order to get
// back the image (server will get that image using the key provided and
// send that back to the client) - using multer-s3 to do 2 steps in 1 since
// i dont really need to do anything in between uploading and sending back
//(on server)

// const S3 = require("aws-sdk/clients/s3");
// const fs = require("fs");

// const bucketName = process.env.AWS_BUCKET_NAME;
// const region = process.env.AWS_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY;
// const secretAccessKey = process.env.AWS_SECRET_KEY;

// const s3 = new S3({
//   region,
//   accessKeyId,
//   secretAccessKey,
// });

// // uploads a file to s3
// function uploadFile(file) {
//   const fileStream = fs.createReadStream(file.path);

//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileStream, // image file itself from filestream
//     Key: file.filename, // from multer in the file object
//   };

//   // return promise rather than cb
//   return s3.upload(uploadParams).promise();
// }

// exports.uploadFile = uploadFile;

// // downloads a file from s3
// function getFileStream(fileKey) {
//   const downloadParams = {
//     Key: fileKey,
//     Bucket: bucketName,
//   };

//   return s3.getObject(downloadParams).createReadStream();
// }
// exports.getFileStream = getFileStream;

/* 
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('./s3')

app.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

app.post('/images', upload.single('image'), async (req, res) => {
  const file = req.file
  console.log(file)

  // apply filter
  // resize 

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log(result)
  const description = req.body.description
  res.send({imagePath: `/images/${result.Key}`})
})
*/
