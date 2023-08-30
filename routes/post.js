const router = require("express").Router();

router.use((req, res, next) => {
  console.log("middleware for posts");
  next();
});

router.get("/write", (req, res) => {
  res.render("write", { title: "글 작성 페이지", mode: "c" });
});

router.post("/write", (req, res) => {
  const post = req.body;
  console.log(post);

  const sql = `INSERT INTO post (title, writer, password, content, hits) values('${post.title}', '${post.writer}', ${post.password}, '${post.content}', 0)`;

  console.log(sql);
  mysql.getConnection((err, connection) => {
    connection.query(sql, (err, result, fields) => {
      if (!err) {
        res.redirect(`/detail/${result.insertId}`);
      } else {
        throw err;
      }
    });
    connection.release();
  });
});

router.get("/detail/:id", async (req, res) => {
  const sql = `UPDATE post SET hits=hits+1 WHERE id = ${req.params.id}`;

  mysql.getConnection((err, connection) => {
    connection.query(sql, (err, result, fields) => {
      if (!err) {
      } else {
        throw err;
      }
    });
    connection.release();
  });

  const sql2 = `SELECT * FROM post where id = ${req.params.id}`;

  mysql.getConnection((err, connection) => {
    connection.query(sql2, (err, result, fields) => {
      if (!err) {
        console.log(result);
        res.render("detail", { title: "상세페이지", post: result[0] });
      } else {
        throw err;
      }
    });
    connection.release();
  });
});

module.exports = router;
