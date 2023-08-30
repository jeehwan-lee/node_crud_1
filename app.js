const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const mysql = require("./db/db");

const postRouter = require("./routes/post");

const postService = require("./services/post_service");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/post", postRouter);

app.listen(3000);
