// newgetpage function for post login route

var db=require('../db/connection.js').mysql_pool;

const newtest = (req, res) => {

    
    db.query('SELECT * FROM complaint_users', function (error, results, fields) {
      if (error) {
        throw error;
      }
      return res.send({ data: results });
    });
   
   
  
  };
  
module.exports = {newtest};
