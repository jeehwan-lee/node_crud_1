const router = require("express").Router();
const postController = require("../controllers/post_controller");

router.get("/", postController.getAllPosts);

router.post("/searchPosts", postController.searchPosts);

router.get("/write", postController.writePostPage);

router.post("/write", postController.writePost);

router.post("/updateHearts", postController.updatePostHearts);

router.get("/detail/:id", postController.getPostDesc);

module.exports = router;
