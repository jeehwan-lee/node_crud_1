const reflyService = require("../services/refly_service");

const writeRefly = async (req, res) => {
  const result = await reflyService.writeRefly(req, res);

  if (result) {
    res.redirect(`/post/detail/${req.body.postId}`);
  }
};

module.exports = {
  writeRefly,
};
