// newlogin function for post login route

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
var db=require('../db/connection.js').mysql_pool;

const newlogin = (req, res) => {
    const { uhid, password } = req.body;
  
    console.log(uhid);
    console.log(password);
    // Check if the user exists in the database
    const sql = "SELECT * FROM complaint_users WHERE uhid = ?";

    db.getConnection(function(err,db)
    {
        db.query(sql, [uhid], (err, results) => {
            if (err) {
                console.error("Error executing the query: ", err);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        
            if (results.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
        
            // Compare the password with the hashed password stored in the database
            const user = results[0];
            bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
                if (bcryptErr) {
                console.error("Error comparing passwords: ", bcryptErr);
                return res.status(500).json({ message: "Internal Server Error" });
                }
        
                if (!bcryptResult) {
                return res.status(401).json({ message: "Invalid password" });
                }
        
                // Create and sign a JSON Web Token (JWT)
                const token = jwt.sign({ id: user.id, email: user.email }, "Athulya", {
                expiresIn: "1h",
                });
        
                // return res.json({ token });
                return res.json({ message: "success", token });
            });
        });
    });
  };

module.exports = {newlogin};
