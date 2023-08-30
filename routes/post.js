const router = require("express").Router();
const postController = require("../controllers/post_controller");

router.use((req, res, next) => {
  console.log("Post 미들웨어 실행");
  next();
});

router.get("/", postController.getAllPosts);

router.get("/write", (req, res) => {
  res.render("write", { title: "글 작성 페이지", mode: "c" });
});

router.post("/write", postController.writePost);

router.get("/detail/:id", postController.getPostDesc);

module.exports = router;
