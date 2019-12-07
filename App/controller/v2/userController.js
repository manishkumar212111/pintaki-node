const modelController = require('../modelController')
const commonHelper = require('../commonHelper')


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
