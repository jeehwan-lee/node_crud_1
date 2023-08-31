const postService = require("../services/post_service");

const getAllPosts = async (req, res) => {
  console.log("herer");
  const allPost = await postService.getAllPosts(req, res);
  console.log(allPost);
  console.log("hello");
  res.render("home", { title: "게시판", posts: allPost });
};

const getPostDesc = async (req, res) => {
  postService.updatePostHits(req, res);
  postService.getPostDesc(req, res);
};

const writePostPage = async (req, res) => {
  res.render("write", { title: "글 작성 페이지", mode: "c" });
};

const writePost = async (req, res) => {
  postService.writePost(req, res);
};

module.exports = {
  getAllPosts,
  getPostDesc,
  writePost,
  writePostPage,
};
