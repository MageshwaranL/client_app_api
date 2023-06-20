// newregister function for post login route

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
var db=require('../db/connection.js').mysql_pool;

const newregister = async (req, res) => {
    try {
      const { username, email, mobile, password } = req.body;
  
      // Check if the user already exists in the database
      const checkUserSql = 'SELECT * FROM complaint_users WHERE email = ?';
      db.query(checkUserSql, [email], (err, results) => {
        if (err) {
          console.error('Error executing the query:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (results.length > 0) {
          // User with the provided email already exists
          return res.status(409).json({ error: 'User already exists' });
        }
  
        // User is not registered, proceed with registration
        bcrypt.hash(password, 10, (bcryptErr, hashedPassword) => {
          if (bcryptErr) {
            console.error('Error hashing password:', bcryptErr);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          
          const registerSql = 'INSERT INTO complaint_users (`username`, `email`, `mobile`, `password`) VALUES (?, ?, ?, ?)';
          const registerValues = [username, email, mobile, hashedPassword];
  
          db.query(registerSql, registerValues, (registerErr, result) => {
            if (registerErr) {
              console.error('Error executing the query:', registerErr);
              return res.status(500).json({ error: 'Internal Server Error' });
            }
  
            return res.json({ status: 'success' });
          });
        });
      });
    } catch (error) {
      console.error('Error processing the registration:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {newregister};
