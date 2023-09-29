const router = require("express").Router();
const postController = require("../controllers/post_controller");

router.get("/", postController.getAllPosts);

router.get("/write", postController.writePostPage);

router.post("/write", postController.writePost);

router.get("/modify/:id", postController.modifyPostPage);

router.post("/modify", postController.modifyPost);

router.get("/updateHearts/:id", postController.updatePostHearts);

router.get("/updateHits/:id", postController.updatePostHits);

router.get("/detail/:id", postController.getPostDesc);

router.post("/postPasswordCheck/:id", postController.postPasswordCheck);

router.get("/delete/:id", postController.deletePost);

module.exports = router;
