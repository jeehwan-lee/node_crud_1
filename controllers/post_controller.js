const postService = require("../services/post_service");
const reflyService = require("../services/refly_service");

const getAllPosts = async (req, res) => {
  const allPost = await postService.getAllPosts(req, res);
  res.render("home", { title: "게시판", posts: allPost });
};

const searchPosts = async (req, res) => {
  const searchResult = await postService.searchPosts(req, res);
  res.render("home", { title: "게시판", posts: searchResult });
};

const getPostDesc = async (req, res) => {
  const post = await postService.getPostDesc(req, res);
  const allRefly = await reflyService.allReflyInPost(req, res);
  res.render("detail", {
    title: "상세페이지",
    postDesc: post[0],
    allRefly: allRefly,
  });
};

const updatePostHits = async (req, res) => {
  const result = await postService.updatePostHits(req, res);

  if (result) {
    res.redirect(`/post/detail/${req.params.id}`);
  }
};

const updatePostHearts = async (req, res) => {
  const result = await postService.updatePostHearts(req, res);

  if (result) {
    res.redirect(`/post/detail/${req.params.id}`);
  }
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
  searchPosts,
  getPostDesc,
  writePost,
  writePostPage,
  updatePostHearts,
  updatePostHits,
};
