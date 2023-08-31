const mysql = require("../db/db");

const getAllPosts = (req, res) => {
  const sql = "SELECT * FROM post";

  return new Promise((resolve, reject) => {
    mysql.getConnection((err, connection) => {
      connection.query(sql, (err, result, fields) => {
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

const getPostDesc = (req, res) => {
  const sql2 = `SELECT * FROM post where id = ${req.params.id}`;

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

const writePost = async (req, res) => {
  const post = req.body;
  const sql = `INSERT INTO post (title, writer, password, content, hits, hearts) values('${post.title}', '${post.writer}', ${post.password}, '${post.content}', 0, 0)`;

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

const updatePostHits = (req, res) => {
  const sql = `UPDATE post SET hits=hits+1 WHERE id = ${req.params.id}`;

  return new Promise((resolve, reject) => {
    mysql.getConnection((err, connection) => {
      connection.query(sql, (err, result) => {
        if (!err) {
          //console.log(result);
          resolve(result);
        } else {
          reject(err);
        }
      });
      connection.release();
    });
  });
};

const updatePostHearts = (req, res) => {
  const sql = `UPDATE post SET hearts=hearts+1 WHERE id = ${req.body.id}`;

  return new Promise((resolve, reject) => {
    mysql.getConnection((err, connection) => {
      connection.query(sql, (err, result, fields) => {
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
  getAllPosts,
  getPostDesc,
  writePost,
  updatePostHits,
  updatePostHearts,
};
