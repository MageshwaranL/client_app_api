
const express= require('express');
const morgan=require("morgan");
const cors=require('cors');
const routes = require("./routes/allroutes");
const nodemailer = require("nodemailer");
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/',routes);

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



app.post("/otpsend", async (req, res) => {
  const email = req.body.email;
  
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

  res.status(200).json({ status: "success" });
});


app.post('/otpsendnn', (req, res) => {
  email=req.body.email;

  // send mail with defined transport object
 var mail={
     to: req.body.email,
    subject: "Otp for registration is: ",
    html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
  };
  
  // Check for error
  if (err) {
    res.status(500).json({ status: "ERROR" });
  } else if (!email) {
    res.status(404).json({ status: "Mail ERROR" });
  } else {
    res.status(200).json({ status: "OK" });
  }
});


app.post('/otpverify',function(req,res){

  if(req.body.otp==otp){
      res.send("You has been successfully registered");
  }
  else{
      res.render('otp',{msg : 'otp is incorrect'});
      res.send("Incorrect");
  }
});


app.listen(8081, () => {

  console.log("Running in port 8081...");
});


