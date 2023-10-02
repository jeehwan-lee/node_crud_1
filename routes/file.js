const router = require("express").Router();
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "files/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

router.post("/upload", upload.array("files", 5), fileController.uploadFile);

module.exports = router;
