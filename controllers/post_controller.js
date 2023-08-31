const postService = require("../services/post_service");

const getAllPosts = async (req, res) => {
  const allPost = await postService.getAllPosts(req, res);
  res.render("home", { title: "게시판", posts: allPost });
};

const getPostDesc = async (req, res) => {
  const result = await postService.updatePostHits(req, res);

  if (result) {
    const post = await postService.getPostDesc(req, res);
    res.render("detail", { title: "상세페이지", post: post });
  }
};

const updatePostHearts = async (req, res) => {
  const result = await postService.updatePostHearts(req, res);
};

const writePostPage = async (req, res) => {
  res.render("write", { title: "글 작성 페이지", mode: "c" });
};

const writePost = async (req, res) => {
  const result = await postService.writePost(req, res);
  console.log(result);

  if (result) {
    res.redirect(`/post/detail/${result.insertId}`);
  }
};

module.exports = {
  getAllPosts,
  getPostDesc,
  writePost,
  writePostPage,
  updatePostHearts,
};
