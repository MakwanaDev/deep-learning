const AWS = require("aws-sdk");
const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
const s3 = new AWS.S3();

// s3.listBuckets((err, data) => {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });

const listBuckets = async () => {
  try {
    const data = await s3.listBuckets().promise();
    console.log(data);
  } catch (error) {
    console.log(error, error.stack);
  }
};

const uploadToS3 = (filePath, bucketName) => {
  const file = fs.readFileSync(filePath);
  const params = {
    Bucket: bucketName,
    Key: path.basename(filePath),
    Body: file,
  };
  s3.upload(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

// listBuckets();
uploadToS3("./Dummy Data/Success.jpg", "demos-s3-event-lambda");
uploadToS3("./Dummy Data/Girl.avif", "demos-s3-event-lambda");
