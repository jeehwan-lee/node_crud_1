// 모듈
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const mysql = require("./config/db");
require("dotenv").config();

const postRouter = require("./routes/post");
const reflyRouter = require("./routes/refly");

// 앱 세팅
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine(
  "handlebars",
  handlebars.create({
    helpers: require("./config/handlebars_helpers"),
  }).engine
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// 라우팅
app.get("/", (req, res) => {
  res.redirect(`/post`);
});

app.use("/post", postRouter);

app.use("/refly", reflyRouter);

app.listen(process.env.PORT, () => {
  console.log("server is running on port 3000");
});
