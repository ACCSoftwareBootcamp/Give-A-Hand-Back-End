//Bring in our multer and path for uploading files
const multer = require("multer");
const path = require("path");

//Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  // This is used to indicate whether a file should be accepted (cb(null, true)) or rejected (cb(new Error("Unsupported file type!"), false)).
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cd(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});
