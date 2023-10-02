const mysql = require("../config/db");

const getAllPosts = (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const searchParam = req.query.searchParam ? req.query.searchParam : "";
  const sql = `SELECT post.*, (SELECT COUNT(*) FROM refly WHERE refly.postId = post.id) AS reflyCount FROM post WHERE title LIKE '%${searchParam}%' ORDER BY id DESC LIMIT ${
    (page - 1) * 10
  }, 10`;

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

const getPostsCount = (req, res) => {
  const searchParam = req.query.searchParam ? req.query.searchParam : "";
  const sql = `SELECT COUNT(*) AS postsCount FROM post WHERE title LIKE '%${searchParam}%'`;

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
  const sql = `INSERT INTO post (title, writer, password, content, hits, hearts, fileGrId) values('${post.title}', '${post.writer}', ${post.password}, '${post.content}', 0, 0, '${post.fileGrId}')`;

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

const modifyPost = (req, res) => {
  const sql = `UPDATE post SET title='${req.body.title}', writer='${req.body.writer}', password=${req.body.password}, content='${req.body.content}' WHERE id = ${req.body.postId}`;

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
  const sql = `UPDATE post SET hearts=hearts+1 WHERE id = ${req.params.id}`;

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

const postPasswordCheck = async (req, res) => {
  const sql = `SELECT * FROM post WHERE id = ${req.params.id} AND password = ${req.body.password}`;

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

const deletePost = async (req, res) => {
  const sql = `DELETE FROM post WHERE id = ${req.params.id}`;

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
  getPostsCount,
  getPostDesc,
  writePost,
  modifyPost,
  updatePostHits,
  updatePostHearts,
  postPasswordCheck,
  deletePost,
};
