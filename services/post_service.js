const mysql = require("../config/db");

const getAllPosts = (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const sql = `SELECT post.*, (SELECT COUNT(*) FROM refly WHERE refly.postId = post.id) AS reflyCount FROM post ORDER BY id DESC LIMIT ${
    (page - 1) * 10
  }, ${page * 10}`;

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
  var sql;
  if (req.query.searchParam) {
    sql = `SELECT COUNT(*) AS postsCount FROM post WHERE title LIKE '%${req.query.searchParam}%'`;
  } else {
    sql = `SELECT COUNT(*) AS postsCount FROM post`;
  }

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
  const page = req.query.page ? req.query.page : 1;

  const sql = `SELECT post.*, (SELECT COUNT(*) FROM refly WHERE refly.postId = post.id) AS reflyCount FROM post WHERE title LIKE '%${
    req.query.searchParam
  }%' ORDER BY id DESC LIMIT ${(page - 1) * 10}, ${page * 10}`;

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
  searchPosts,
  getPostDesc,
  writePost,
  updatePostHits,
  updatePostHearts,
  postPasswordCheck,
  deletePost,
};
