const multer = require('multer');

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

module.exports=multerMiddleware;