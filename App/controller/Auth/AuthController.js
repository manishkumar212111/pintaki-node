const modelController = require('../modelController')
const commonHelper = require('../commonHelper')


const AuthController = {
    Auth : async (req, res , next) => {
        try{
            if(req.query && req.query.remember_digest){
                let result = await modelController.findInDb({remember_digest : req.query.remember_digest , is_logged_in : 1 , status : 'active'} , 'users' , ['id' , 'email' , 'role' , 'name' , 'mobile'] , ' AND ');
                if(result && result[0]){
                    req.user = result[0];
                    return next();
                } else {
                    res.send({status : 500, messages : "Digest is wrong"});
                }
            } else {
                res.send({status : 500, messages : "Digest is missing"});
            }
        } catch (error){
            console.log(error);
            res.send({status : 500, messages : "something wrong"});
        }
    }

}
module.exports = AuthController
