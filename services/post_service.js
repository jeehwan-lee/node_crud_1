const mysql = require("../db/db");

const getAllPosts = async (req, res) => {
  const sql = "SELECT * FROM post";

  mysql.getConnection((err, connection) => {
    connection.query(sql, (err, result, fields) => {
      if (!err) {
        res.render("home", { title: "게시판", posts: result });
      } else {
        throw err;
      }
    });
    connection.release();
  });
};

const getPostDesc = async (req, res) => {
  const sql2 = `SELECT * FROM post where id = ${req.params.id}`;

  mysql.getConnection((err, connection) => {
    connection.query(sql2, (err, result, fields) => {
      if (!err) {
        console.log(result);
        res.render("detail", { title: "상세페이지", post: result[0] });
      } else {
        throw err;
      }
    });
    connection.release();
  });
};

const writePost = async (req, res) => {
  const post = req.body;

  const sql = `INSERT INTO post (title, writer, password, content, hits) values('${post.title}', '${post.writer}', ${post.password}, '${post.content}', 0)`;

  mysql.getConnection((err, connection) => {
    connection.query(sql, (err, result, fields) => {
      if (!err) {
        res.redirect(`/detail/${result.insertId}`);
      } else {
        throw err;
      }
    });
    connection.release();
  });
};

const updatePostHits = async (req, res) => {
  const sql = `UPDATE post SET hits=hits+1 WHERE id = ${req.params.id}`;

  mysql.getConnection((err, connection) => {
    connection.query(sql, (err, result, fields) => {
      if (!err) {
      } else {
        throw err;
      }
    });
    connection.release();
  });
};

module.exports = {
  getAllPosts,
  getPostDesc,
  writePost,
  updatePostHits,
};
