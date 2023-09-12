const reflyService = require("../services/refly_service");

const writeRefly = async (req, res) => {
  const result = await reflyService.writeRefly(req, res);

  if (result) {
    res.json(result);
  }
};

const reflyPasswordCheck = async (req, res) => {
  const result = await reflyService.reflyPasswordCheck(req, res);

  if (result.length == 0) {
    res.json({ result: false });
  } else {
    res.json({ result: true });
  }
};

const deleteRefly = async (req, res) => {
  const result = await reflyService.deleteRefly(req, res);
  if (result) {
    res.redirect(`/post/`);
  }
};

module.exports = {
  writeRefly,
  reflyPasswordCheck,
  deleteRefly,
};
