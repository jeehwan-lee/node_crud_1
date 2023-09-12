const postService = require("../services/post_service");
const reflyService = require("../services/refly_service");

const getAllPosts = async (req, res) => {
  const allPost = await postService.getAllPosts(req, res);
  const postsCount = await postService.getPostsCount(req, res);

  var tempArr = [];

  for (var i = 0; i < postsCount[0].postsCount / 10; i++) {
    tempArr.push(i + 1);
  }

  res.render("home", {
    title: "게시판",
    posts: allPost,
    postsCount: tempArr,
  });
};

const searchPosts = async (req, res) => {
  const searchResult = await postService.searchPosts(req, res);
  const postsCount = await postService.getPostsCount(req, res);

  var tempArr = [];

  for (var i = 0; i < postsCount[0].postsCount / 10; i++) {
    tempArr.push(i + 1);
  }

  res.render("home", {
    title: "게시판",
    posts: searchResult,
    postsCount: tempArr,
  });
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
  searchPosts,
  getPostDesc,
  writePost,
  writePostPage,
  updatePostHearts,
  updatePostHits,
  postPasswordCheck,
  deletePost,
};
