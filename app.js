const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home", { title: "안녕하세요", message: "반갑습니다." });
});

app.listen(3000);
