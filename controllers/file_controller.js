const { v4 } = require("uuid");

const fileService = require("../services/file_service");

const uploadFiles = async (req, res) => {
  const fileGrId = v4();

  for (var i = 0; i < req.files.length; i++) {
    const fileId = v4();
    await fileService.writeFilesDesc(fileGrId, fileId, req.files[i]);
  }
  res.json({ fileGrId: fileGrId });
};

const downloadFile = async (req, res) => {
  const file = await fileService.getFile(req.query.fileId);
  res.download(file[0].savedPath);
};

module.exports = {
  uploadFiles,
  downloadFile,
};
