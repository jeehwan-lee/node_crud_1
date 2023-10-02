const mysql = require("../config/db");

const writeFilesDesc = async (fileGrId, fileId, file) => {
  const sql = `INSERT INTO files (fileGrId, fileId, fileName, savedPath) values('${fileGrId}', '${fileId}', '${file.filename}', '${file.destination}${file.filename}')`;
  return new Promise((resolve, reject) => {
    mysql.getConnection((err, connection) => {
      connection.query(sql, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
      connection.release();
    });
  });
};

module.exports = {
  writeFilesDesc,
};
