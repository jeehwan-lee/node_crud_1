const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileController = require("../controllers/file_controller");

try {
  fs.readdirSync("files");
} catch (error) {
  fs.mkdirSync("files");
}

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

router.post("/upload", upload.array("files", 5), fileController.uploadFiles);

router.get("/download", fileController.downloadFile);

module.exports = router;
