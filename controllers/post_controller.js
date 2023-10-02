const postService = require("../services/post_service");
const reflyService = require("../services/refly_service");
const fileService = require("../services/file_service");

const getAllPosts = async (req, res) => {
  const allPost = await postService.getAllPosts(req, res);
  const postsCount = await postService.getPostsCount(req, res);
  const page = req.query.page ? req.query.page : 1;

  var tempArr = [];

  for (var i = 0; i < postsCount[0].postsCount / 10; i++) {
    tempArr.push(i + 1);
  }

  res.render("home", {
    title: "게시판",
    posts: allPost,
    postsCount: tempArr,
    page: page,
  });
};

const getPostDesc = async (req, res) => {
  const post = await postService.getPostDesc(req, res);
  const allRefly = await reflyService.allReflyInPost(req, res);
  var files = [];
  if (post[0].fileGrId) {
    files = await fileService.getFileGroup(post[0].fileGrId);
  }

  res.render("detail", {
    title: "상세페이지",
    postDesc: post[0],
    allRefly: allRefly,
    files: files,
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
  res.render("write", { title: "글 작성 페이지" });
};

const writePost = async (req, res) => {
  const result = await postService.writePost(req, res);

  if (result) {
    res.json(result);
  }
};

const modifyPostPage = async (req, res) => {
  const post = await postService.getPostDesc(req, res);
  res.render("modify", { title: "글 수정 페이지", postDesc: post[0] });
};

const modifyPost = async (req, res) => {
  const result = await postService.modifyPost(req, res);
  if (result) {
    res.json(result);
  }
};

const postPasswordCheck = async (req, res) => {
  const result = await postService.postPasswordCheck(req, res);

  if (result.length == 0) {
    res.json({ result: false });
  } else {
    res.json({ result: true });
  }
};

const deletePost = async (req, res) => {
  const result = await postService.deletePost(req, res);

  if (result) {
    res.redirect(`/post/`);
  }
};

module.exports = {
  getAllPosts,
  getPostDesc,
  writePost,
  writePostPage,
  modifyPostPage,
  modifyPost,
  updatePostHearts,
  updatePostHits,
  postPasswordCheck,
  deletePost,
};
