const mysql = require("./db/db");

async function writePost(post) {
  post.hits = 0;

  const sql = "INSERT INTO node_crud(title, writer, password, content) values(";

  mysql.getConnection((err, connection) => {
    connection.query(sql, (err, result, fields) => {
      if (!err) {
        console.log(result);
        connection.release();
      } else {
        throw err;
      }
    });
  });
}

async function list(page, search) {
  const sql = "SELECT * FROM post";

  mysql.getConnection((err, connection) => {
    connection.query(sql, (err, result, fields) => {
      if (!err) {
        console.log(result);
        connection.release();
      } else {
        throw err;
      }
    });
  });
}

module.exports = {
  list,
};
