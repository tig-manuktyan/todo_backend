module.exports = (multer) => {
  return class Upload {
    constructor(storagePath) {
      this.storagePath = storagePath;
      return this.upload();
    }

    upload() {
      const self = this;
      const storage = multer.diskStorage({
        destination(req, file, cb) {
          cb(null, self.storagePath);
        },
        filename(req, file, cb) {
          console.log('file => ', file);
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      });
      return multer({ storage });
    }
  };
};
