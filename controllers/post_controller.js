const postService = require("../services/post_service");

const getAllPosts = async (req, res) => {
  postService.getAllPosts(req, res);
};

const getPostDesc = async (req, res) => {
  postService.updatePostHits(req, res);
  postService.getPostDesc(req, res);
};

const writePost = async (req, res) => {
  postService.writePost(req, res);
};

module.exports = {
  getAllPosts,
  getPostDesc,
  writePost,
};
