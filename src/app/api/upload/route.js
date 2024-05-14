// pages/api/upload.js
import multer from 'multer';
import nextConnect from 'next-connect';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limita a 5MB per file
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {
  const { file } = req;
  const { albumId } = req.body; // Assicurati di passare albumId come parte del form data se necessario

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${albumId}/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error uploading file." });
    }
    res.status(200).json({ message: "File uploaded successfully", data });
  });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
