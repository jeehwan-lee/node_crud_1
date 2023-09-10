const mysql = require("../config/db");

const writeRefly = async (req, res) => {
  const refly = req.body;
  const sql = `INSERT INTO refly (postId, writer, password, comment) values('${refly.postId}', '${refly.writer}', ${refly.password}, '${refly.comment}')`;

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

const allReflyInPost = async (req, res) => {
  const sql2 = `SELECT * FROM refly where postId = ${req.params.id}`;

  return new Promise((resolve, reject) => {
    mysql.getConnection((err, connection) => {
      connection.query(sql2, (err, result) => {
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
  writeRefly,
  allReflyInPost,
};
