const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const mysql = require("./db/db");

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home", { title: "안녕하세요", message: "반갑습니다." });
});

app.get("/write", (req, res) => {
  res.render("write", { title: "테스트 게시판" });
});

app.get("/detail/:id", async (req, res) => {
  res.render("detail", { title: "테스트 게시판" });
});

app.listen(3000);
