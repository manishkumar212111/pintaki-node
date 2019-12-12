const modelController = require('../modelController')
const commonHelper = require('../commonHelper')
// const bcrypt = require( 'bcrypt' );
var passwordHash = require('password-hash');

const UserController = {
    logout : async (req, res) => {
        try {
            await modelController.updateTable({remember_digest : "" , is_logged_in : 0} , 'users' , req.query.remember_digest , 'remember_digest');    
            return commonHelper.sendResponseData(req , res , {} , "Logged Out " , false , 200)            
        } catch (error){
            console.log(error);
            return commonHelper.sendResponseData(req , res , {} , "Error at backend" , true)
    
        }
    },
    register : async (req , res) => {
        try {
            let validationObj = commonHelper.validateArray(req.body , ['mobile' , 'name', 'password' ,'role']);
            if(!validationObj.status){
                return res.send({status : 500, messages : validationObj.message});
            }
            if(req.body.role == 'contractor'){
                validationObj = commonHelper.validateArray(req.body , ['firm_name' , 'email']);
                if(!validationObj.status){
                    return res.send({status : 500, messages : validationObj.message});
                }
            }
            // check if user already registered
            let result = await modelController.findInDb({mobile : req.body.mobile} , 'users' , ['id']);
            if(result && result[0]){
                return res.send({status : 500, messages : "Already registered"});
            }
            // register User
            let insertData = {
                name : req.body.name ,
                mobile : req.body.mobile, 
                role : req.body.role
            }
            insertData['password'] = passwordHash.generate(req.body.password);
           
            if(req.body.role == 'contractor'){
                insertData['email'] = req.body.email;
                insertData['firm_name'] = req.body.firm_name;
            }
            insertData['remember_digest'] = commonHelper.randomString(24);
            console.log(insertData)
            let insertId = await modelController.insertIntoDb("users" , insertData);
            delete insertData['password'];
            if(insertId){
                insertData.user_id = 'insertId';
                return commonHelper.sendResponseData(req , res , insertData , "Profile created" , false ,200);
            }
            return commonHelper.sendResponseData(req , res , {} , "Something went wrong" , true)

        } catch (error){
            console.log(error);
            return commonHelper.sendResponseData(req , res , {} , "Error at backend" , true)
    
        }
    },
    login : async (req , res) => {
        try {
            let validationObj = commonHelper.validateArray(req.body , ['mobile' , 'password']);
            if(!validationObj.status) {
                return res.send({status : 500, messages : validationObj.message});
            }
            let result = await modelController.findInDb({mobile : req.body.mobile} , 'users' , ['id' , 'password' , 'email' , 'name' , 'remember_digest' , 'firm_name' , 'mobile','status' , 'role' , 'profile_image']);
            if(result && result[0]){
                // check if user is active
                if(result[0].status !== 'active'){
                    return commonHelper.sendResponseData(req , res , {} , "this user is not active" , true);                                 
                }
                if(passwordHash.verify(req.body.password, result[0].password)){
                    delete result[0].password; 
                    return commonHelper.sendResponseData(req , res , result[0] , "Logged In success" , false ,200);
                }
            }
            return commonHelper.sendResponseData(req , res , {} , "Incorrect UserName or password" , true);                                     
        } catch (error){
            console.log(error);
            return commonHelper.sendResponseData(req , res , {} , "Error at backend" , true);
        }
    },
    wishlist : async (req , res) => {
        try {
            let validateObj = commonHelper.validateArray(req.body , ['product_id' , 'liked']);            
            await modelController.updateTable({remember_digest : "" , is_logged_in : 0} , 'users' , req.query.remember_digest , 'remember_digest');    
            return commonHelper.sendResponseData(req , res , {} , "Logged Out " , false , 200)            
        } catch (error){
            console.log(error);
            return commonHelper.sendResponseData(req , res , {} , "Error at backend" , true)
    
        }
    }

}
module.exports = UserController
