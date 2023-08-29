const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const mysql = require("./db/db");

const postService = require("./services/post_service");

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  const sql = "SELECT * FROM post";

  mysql.getConnection((err, connection) => {
    connection.query(sql, (err, result, fields) => {
      if (!err) {
        console.log(result);
        res.render("home", { title: "게시판", posts: result });
      } else {
        throw err;
      }
    });
    connection.release();
  });
});

app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판" });
});

app.get("/detail/:id", async (req, res) => {
  const sql = `UPDATE post SET hits=hits+1 WHERE id = 1`;

  mysql.getConnection((err, connection) => {
    connection.query(sql, (err, result, fields) => {
      if (!err) {
      } else {
        throw err;
      }
    });
    connection.release();
  });

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
});

app.listen(3000);
