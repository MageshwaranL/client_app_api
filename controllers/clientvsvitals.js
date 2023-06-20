// clientvsvitals function for post login route

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
var db=require('../db/connection.js').mysql_pool;

const newclientvsvitals = (req, res) => {

    // if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]) {
  
    //   return res.status(422).json({
    //     message: "Please provide the token",
    //   });
  
    // }
    var uhid=req.body.uhid;
    //use session variable instead of req.body.token
    var theToken=req.body.token;
    try{
        //const theToken = req.headers.authorization.split(' ')[1];
        if(!theToken){
            return res.status(422).json({
              message: "Please provide the token",
           });
        }
        const decoded = jwt.verify(theToken, 'Athulya');
        console.log(theToken);
        db.query("select * from patients where patient_id=?",[uhid],(error,results1)=>{

            if (error) {
            console.error("Error executing the query: ", err);
            return res.status(500).json({ message: "Internal Server Error" });
            }
            if (results1.length === 0) {
                return res.status(404).json({ message: "Patient Record Not Exists" });
            }else{
                console.log(results1[0].id);
                var patient_id=results1[0].id;
                var test="select p.patient_id,concat(p.first_name,' ',p.middle_name,' ',p.last_name) as full_name,p.email,p.date_of_birth,p.age,p.blood_group,p.bmi,p.height_in_feet,p.height_in_inches,patient_activity_vitals.activity_bp_systole,patient_activity_vitals.activity_bp_diastole,patient_activity_vitals.activity_temp,patient_activity_vitals.activity_pulse,patient_activity_vitals.activity_resp,patient_activity_vitals.activity_pain_score,patient_activity_vitals.activity_pain_location_description,patient_activity_vitals.activity_spo,patient_activity_vitals.activity_solid_intake,patient_activity_vitals.activity_sugar_check,patient_activity_vitals.cbg_result,patient_activity_vitals.cbg_sign,patient_activity_vitals.fbs_result,patient_activity_vitals.fbs_sign,patient_activity_vitals.ppbs_result,patient_activity_vitals.ppbs_sign,patient_activity_vitals.activity_urine_output,patient_activity_vitals.activity_motion,patient_activity_vitals.activity_intake,patient_activity_vitals.activity_output  from patient_activity_vitals join patients p on patient_activity_vitals.patient_id=p.id where patient_activity_vitals.schedule_date=curdate() and patient_activity_vitals.id='"+patient_id+"'";
                db.query(test,(err,results2)=>{
                    //console.log("select patient_activity_vitals.activity_temp as activity_temp from patient_activity_vitals join patients on patient_activity_vitals.patient_id=patients.id where id='"+patient_id+"'");
                   console.log(results2[0]);
                   if(results2)
                   {   
                    return res.status(422).json({message:results2[0]});
                   }else{
                      return res.json({ message: "Vitals Not Present" });
                   }
                    // return res.json({ message: "success", results2 });
                });
                
            }
        });
        
        
    }catch(err){
    return res.status(422).json({
        message: "JWT Token Expired / Mismatch Please Login..",
    });
    }
    
    //if(decoded)
    //{
        // db.query("select * from patients where patient_id=?",[uhid],(error,results1)=>{

        //     if (error) {
        //         console.error("Error executing the query: ", err);
        //         return res.status(500).json({ message: "Internal Server Error" });
        //     }
        
        //     if (results1.length === 0) {
        //         return res.status(404).json({ message: "Patient Record Not Exists" });
        //     }else{
                
        //         var patient_id=results1.id;
        //         console.log("TEst"+results1);
        //         db.query("SELECT p.patient_id,concat(p.first_name,' ',p.middle_name,' ',p.last_name) as full_name,p.email,p.date_of_birth,p.age,p.blood_group,p.bmi,p.height_in_feet,p.height_in_inches,activity_bp_systole,activity_bp_diastole,activity_temp,activity_pulse,activity_resp,activity_pain_score,activity_pain_location_description,activity_spo,activity_solid_intake,activity_sugar_check,cbg_result,cbg_sign,fbs_result,fbs_sign,ppbs_result,ppbs_sign,activity_urine_output,activity_motion,activity_intake,activity_output from patient_activity_vitals join patients p on patient_activity_vitals.patient_id=p.id where schedule_date=curdate() and p.patient_id=?",[patient_id],(error,results1)=>{
                    
        //             if (error) {
        //                 console.error("Error executing the query: ", err);
        //                 return res.status(500).json({ message: "Internal Server Error" });
        //             }
        //             console.log(results1);
        //             return res.send({ error: false, data: results1, message: 'Fetch Successfully.' });
         
        //         });
                
        //     }
            
            
        //    //console.log(results);
          
        // });
      //console.log(uhid); 
    // }else{
    //     return res.status(422).json({
    //         message: "Please Login Again JWT Token Expired",
    //       });
    // }
    // db.query("SELECT p.patient_id,concat(p.first_name,' ',p.middle_name,' ',p.last_name) as full_name,p.email,p.date_of_birth,p.age,p.blood_group,p.bmi,p.height_in_feet,p.height_in_inches,activity_bp_systole,activity_bp_diastole,activity_temp,activity_pulse,activity_resp,activity_pain_score,activity_pain_location_description,activity_spo,activity_solid_intake,activity_sugar_check,cbg_result,cbg_sign,fbs_result,fbs_sign,ppbs_result,ppbs_sign,activity_urine_output,activity_motion,activity_intake,activity_output from patient_activity_vitals join patients p on patient_activity_vitals.patient_id=p.id where schedule_date=curdate() and p.patient_id=?", [uhid], function (error, results, fields) {
    //   if (error) {
    //     throw error;
    //   }
    //   console.log(results);
    //   return res.send({ error: false, data: decoded, message: 'Fetch Successfully.' });
    // });
  
  };
  
module.exports = {newclientvsvitals};
