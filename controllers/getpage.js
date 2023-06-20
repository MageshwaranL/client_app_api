// newgetpage function for post login route

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
var db=require('../db/connection.js').mysql_pool;

const newgetpage = (req, res) => {

    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
  
      return res.status(422).json({
        message: "Please provide the token",
      });
  
    }
   
    try{
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'Athulya');
    }catch(err){
      return res.status(422).json({
        message: "JWT Token Expired Please Login..",
      });
    }
    console.log(decoded);
    if(decoded)
    {
    db.query('SELECT * FROM complaint_users where email=?', decoded.id, function (error, results, fields) {
      if (error) {
        throw error;
      }
      return res.send({ error: false, data: decoded, message: 'Fetch Successfully.' });
    });
   }
 
   
  
  };
  
module.exports = {newgetpage};
