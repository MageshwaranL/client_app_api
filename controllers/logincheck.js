// newgetpage function for post login route

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
var db=require('../db/connection.js').mysql_pool;
const nodemailer = require("nodemailer");

var email;

function GenerateOTP()  {
  var otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  console.log(otp);
  
  return otp;
}



const contactEmail = nodemailer.createTransport({
  host: "mail.athulyahomecare.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "noreply@athulyaseniorcare.com", // generated ethereal user
    pass: "Athulya@123", // generated ethereal password
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

const newlogincheck = async (req, res) => {

    var email=req.body.email;
    var uhid=req.body.uhid;
    console.log(email+" "+uhid);
    const sql = "SELECT * FROM complaint_users WHERE email = ?";

    try {
        const {  email, uhid } = req.body;
    
        // Check if the email already exists in the database with 1st uhid
        const checkUserSql = 'SELECT * FROM complaint_users WHERE email = ?';
        const checkuhid="select * from complaint_users where uhid='"+req.body.uhid+"'";
        console.log(checkuhid);
        db.query(checkUserSql, [email], (err, results) => {
          if (err) {
            console.error('Error executing the query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
    
          if (results.length > 0) {
            
            db.query(checkuhid,(err,results1)=>{
               if(err){
                  console.error('Error executing the query:', err);
                 return res.status(500).json({ error: 'Internal Server Error' });
               }
               if(results1.length>0)
               {
                return res.status(409).json({ error: 'User already exists with same UHID Please Login' });
               }
               return res.status(409).json({ error: 'User already exists with different UHID, Please try another UHID' });
            });
            //return res.json({ status: 'new user' });
          }else{
            const checkemailindb="select * from patients where email='"+req.body.email+"'";
             
             db.query(checkemailindb,(err,results2)=>{
                if(err){
                    console.error('Error executing the query:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                if(results2.length>0)
                {
                    //new user so send otp to client id
                    otp = GenerateOTP();

                    // Set up the mail options
                    const mailOptions = {
                        to: email,
                        subject: "OTP for registration is:",
                        html: `<h3>OTP for account verification is:</h3>
                            <h1 style="font-weight:bold;">${otp}</h1>` // html body
                    };


                    
                    // Send the mail
                    contactEmail.sendMail(mailOptions, (error, info) => {
                        if (error) {
                        console.log(error);
                        res.status(500).json({ status: "ERROR" });
                        } else {
                        console.log('Message sent: %s', info.messageId);   
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                        res.render('otp'); // Render the 'otp' view
                        }
                        
                      });
                    return res.status(409).json({ error: 'New User OTP send to email id' });
                }
                return res.json({ status: 'User not exists' })
             })
            
          }


          
        });
      } catch (error) {
        console.error('Error processing the registration:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  
module.exports = {newlogincheck};
