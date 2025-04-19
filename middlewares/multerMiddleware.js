const multer = require('multer');
const path = require("path");
const fs = require("fs");
// 配置内存存储
const storageMemory = multer.memoryStorage();

// 创建 multer 实例，使用内存存储，返回的是中间件函数
const multerMiddleware= multer({
  storage: storageMemory,//内存存储
  limits: { fileSize: 5 * 1024 * 1024 },  // 限制文件最大为5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('只允许上传图片文件'));
    }
    cb(null, true);
  }
}).single('image');  //指定上传字段的字段名

const createStorage = (folderName, fieldName) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = path.join(__dirname, `../uploads/${folderName}`);
      fs.mkdirSync(folderPath, { recursive: true });
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${fieldName}-${uniqueSuffix}${ext}`);
    },
  });

// 1. 音频
const soundUpload = multer({
  storage: createStorage('sound', 'sound'),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('audio/')) {
      return cb(new Error('sound必须是音频文件'));
    }
    cb(null, true);
  },
}).single('sound');

// 2. 加速度文件（假设是 .json 格式）
const acclerationUpload = multer({
  storage: createStorage('accleration', 'accleration'),
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== '.json') {
      return cb(new Error('accleration必须是JSON文件'));
    }
    cb(null, true);
  },
}).single('accleration');

// 3. 光照强度文件（假设是 .csv）
const lightUpload = multer({
  storage: createStorage('light', 'light'),
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== '.csv') {
      return cb(new Error('light必须是CSV文件'));
    }
    cb(null, true);
  },
}).single('light');

const combinedMiddleware = (req, res, next) => {
  req.files = {}; // 初始化 files 对象

  soundUpload(req, res, (err) => {
    if (err) return next(err);
    if (req.file) req.files.sound = [req.file];

    acclerationUpload(req, res, (err) => {
      if (err) return next(err);
      if (req.file) req.files.accleration = [req.file];

      lightUpload(req, res, (err) => {
        if (err) return next(err);
        if (req.file) req.files.light = [req.file];

        next(); // 全部成功后继续
      });
    });
  });
};


module.exports={
  multerMiddleware,
  combinedMiddleware
};