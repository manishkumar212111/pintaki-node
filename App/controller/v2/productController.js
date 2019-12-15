const modelController = require('../modelController')
const commonHelper = require('../commonHelper')
const seoData = require('../../data/seo')

const ProductController = {
    
    wishlist : async (req , res) => {
        try {
            let validateObj = commonHelper.validateArray(req.body , ['product_id' , 'liked']);            
            
            if(!validateObj.status){
                return commonHelper.sendResponseData(req , res , {} , validateObj.message , true , 500);
            }
            if(req.body.liked) {
                // check in wishlist of user available with this product
                let result = await modelController.findInDb({user_id : req.user.id , product_id : req.body.product_id } , 'wishlist' , ['id' , 'liked'] , ' AND ');
                if(result && result[0]){
                    // update wishlist and set liked = 1 
                    result[0].liked != 1 && await modelController.updateTable({liked : 1 } , 'wishlist' , result[0].id );
                } else {
                    // if user have not liked it before insert new records
                    let insertObj = {
                        user_id : req.user.id,
                        product_id : req.body.product_id
                    }
                    await modelController.insertIntoDb('wishlist',insertObj);
                }
            } else {
                // for deslike
                let query = `UPDATE wishlist SET liked = ? where user_id= ? AND product_id= ?`;
                await executeQuery(query,[0 , req.user.id , req.body.product_id]); 
            }
            return commonHelper.sendResponseData(req , res , {} , "Updated successfully" , false , 200)            
        } catch (error){
            console.log(error);
            return commonHelper.sendResponseData(req , res , {} , "Error at backend" , true , 500)
    
        }
    },
    getWishList : async (req, res) => {
        try {
            if(!(req.user && req.user.id))
                return commonHelper.sendResponseData(req , res , {} , "Login required" , true , 500)            

            let query = `SELECT p.* from wishlist w INNER JOIN projects p ON w.product_id = p.id where w.user_id = ? AND liked = ? ORDER BY w.id DESC`;
            let result = await executeQuery(query, [ req.user.id , 1]);     
            let data = {
                items : result,
                seo : seoData.seo('wishList')
            }
            return commonHelper.sendResponseData(req , res , data , "Fetched Data" , false , 200);            
        } catch (error){
            console.log(error);
            return commonHelper.sendResponseData(req , res , {} , "Error at backend" , true , 500)

        }
    },
    createPost : async (req , res) => {
        try {
            if(!(req.user && req.user.id))
                return commonHelper.sendResponseData(req , res , {} , "Login required" , true , 500)            
            let validateObj = commonHelper.validateArray(req.body , ['title' , 'description' , 'category']);            
            if(!validateObj.status){
                return commonHelper.sendResponseData(req , res , {} , validateObj.message , true , 500);
            }

            let insertObj = {
                title : req.body.title,
                description : req.body.description,
                user_id : req.user.id,
                user_name : req.user.name,
                firm_name : req.user.firm_name ? req.user.firm_name : "",
                images : req.user.images,
                category : req.body.category 
            }        
            let insertId = await modelController.insertIntoDb('posts',insertObj);
            if(insertId){
                var title = req.body.title && req.body.title.split(' ').join('-');   
                await modelController.updateTable({url :  title+"/"+insertId} , 'posts' , insertId)
                return commonHelper.sendResponseData(req , res , {id : insertId} , "post added" , true , 200);                        
            }
            return commonHelper.sendResponseData(req , res , {} , "Something wrongq" , true);            
        } catch (error){
            console.log(error);
            return commonHelper.sendResponseData(req , res , {} , "Error at backend" , true , 500)

        }
    }

}
module.exports = ProductController
