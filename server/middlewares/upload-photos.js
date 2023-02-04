const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");


aws.config.update({
  accessKeyId: process.env.AWSAccessKeyID,
  secretAccessKey: process.env.AWSSecretAccessKey,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "ecom-amazon-clone-v1",
    acl: "public-read",

    // key is date of upload which will be name of the file when uploaded
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname  });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '.jpeg');
    },
  }),
});

module.exports = upload;
