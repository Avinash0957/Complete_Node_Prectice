const conn = require("../config/config");

class todomudleapp {
  async addtodo(todotitle) {
    return new Promise((resolve, reject) => {
      const insquery = `insert into tbltodoapp(title) values (?);`;
      conn.query(insquery, [todotitle], (err, ins) => {
        if (err) {
          console.log("err", err);
          reject(err);
        } else {
          resolve(ins);
        }
      });
    });
  }

  async updatetodo(status, id) {
    return new Promise((resolve, reject) => {
      const insquery = `update tbltodoapp set status = ? where id = ? ;`;
      conn.query(insquery, [status, id], (err, ins) => {
        if (err) {
          console.log("err", err);
          reject(err);
        } else {
          resolve(ins);
        }
      });
    });
  }

  async deletetodo(id) {
    return new Promise((resolve, reject) => {
      const insquery = `Delete from tbltodoapp where id = ?;`;
      conn.query(insquery,[id], (err, ins) => {
        if (err) {
          console.log("err", err);
          reject(err);
        } else {
          resolve(ins);
        }
      });
    });
  }

  async getalltodo(id) {
    return new Promise((resolve, reject) => {
      const selectquery = `SELECT id, title, status, create_at FROM tbltodoapp${
        id ? " WHERE id = ?" : ""
      }`;      
      const params = id ? [id] : [];

      conn.query(selectquery, params, (err, results) => {
        if (err) {
          console.log("err", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async getalltodocount(id) {

    return new Promise((resolve, reject) => {
      const selectquery = `select (select count(*) from tbltodoapp) as Totaltask, (select count(*) from tbltodoapp where status = '1') as Completedtask`;      
      conn.query(selectquery, (err, results) => {
        if (err) {
          console.log("err", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
  
}


module.exports = new todomudleapp();
