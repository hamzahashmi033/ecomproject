// require("dotenv").config();

const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid");
const fs = require("fs");

const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "AKIA5TZE5YLH4ENJB7T5";
const secretAccessKey =
  process.env.AWS_SECRET_KEY || "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";
const region = process.env.AWS_REGION || "ap-south-1";
const bucket = process.env.AWS_BUCKET_NAME || "kmmart";
const acl = process.env.AWS_ACL || "public-read";

// console.log(region);

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const storage = multerS3({
  s3,
  bucket,
  acl,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    cb(null, uuid.v4() + "-" + Date.now() + "-" + file.originalname);
  },
});

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

exports.upload = multer({
  storage: localStorage,
  fileFilter: (req, file, cb) => {
    if (
      ["image/png", "image/gif", "image/jpeg", "image/jpg"].includes(
        file.mimetype
      )
    ) {
      cb(null, true);
    } else {
      cb(new Error("Valid file types are .png,.gif,.jpeg and .jpg"), false);
    }
  },
});

exports.delete = (url) => {
  const urlSlices = url.split("/");
  const key = decodeURI(urlSlices.pop());
  fs.unlink("./public/images/" + key, (err) => {
    if (err) throw err;
    console.log("File removed successfully.");
  });
};
