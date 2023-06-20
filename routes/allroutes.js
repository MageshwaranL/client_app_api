const app = require('express'); //import express


const router  = app.Router(); 

const testController = require('../controllers/login');
const registerController = require('../controllers/register');
const getpageController = require('../controllers/getpage');
const logincheckController=require('../controllers/logincheck');
const clientvsvitalsController=require('../controllers/clientvsvitals');

const test1Controller=require('../controllers/test.js');

router.post('/login', testController.newlogin); 

router.post('/register', registerController.newregister);

router.post('/getpage', getpageController.newgetpage); 

router.post('/logincheck',logincheckController.newlogincheck);

router.post('/clientvsvitals',clientvsvitalsController.newclientvsvitals);

router.get('/test',test1Controller.newtest);

module.exports = router; // export to use in server.js
