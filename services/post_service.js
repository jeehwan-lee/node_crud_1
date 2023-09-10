const mysql = require("../config/db");

const getAllPosts = (req, res) => {
  const sql =
    "SELECT post.*, (SELECT COUNT(*) FROM refly WHERE refly.postId = post.id) AS reflyCount FROM post ORDER BY id DESC";

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

const searchPosts = (req, res) => {
  const sql = `SELECT post.*, (SELECT COUNT(*) FROM refly WHERE refly.postId = post.id) AS reflyCount FROM post WHERE title LIKE '%${req.body.searchParam}%'`;

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
  const sql2 = `SELECT post.*, (SELECT COUNT(*) FROM refly WHERE refly.postId = post.id) AS reflyCount FROM post where id = ${req.params.id}`;

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
  searchPosts,
  getPostDesc,
  writePost,
  updatePostHits,
  updatePostHearts,
};
