const modelController = require('./modelController')
const commonHelper = require('./commonHelper');

var widgetController = {
    leadSubmit : async function (req , res ){
        try {
            let data = req.body;
            if(!data.name || !data.mobile || !data.location){
                return commonHelper.sendResponseData(req , res , data , "name ,mobile and location is required" ,true, 500);    
            }
            let DBObject = {
                name : data.name ,
                mobile : data.mobile,
                lead_type : data.interested_in ? data.interested_in : 'others',
                source : data.source ? data.source : 'web',
                area : data.area ? parseInt(data.area) : '',
                location : data.location,
                ref_PINID : data.ref_PINID ? data.ref_PINID : ''
            }
            const insertId = await modelController.insertIntoDb('leads',DBObject);
            return commonHelper.sendResponseData(req , res , data , "Data inserted with ID"+insertId ,false, 200);    
        } catch(error){
            console.log(error);
            return commonHelper.sendResponseData(req , res , {} , "Error at backend" , true)
        }
    },
    contactUs : async function(req , res){
        try {
            let data = req.body;
            if(!data.name || !data.mobile || !data.email){
                return commonHelper.sendResponseData(req , res , data , "name and mobile is required" ,true, 500);    
            }
            let DBObject = {
                name : data.name ,
                mobile : data.mobile,
                source : data.source ? data.source : 'web',
                user_email : data.email,
                comment : data.comments 
            }
            const insertId = await modelController.insertIntoDb('contact',DBObject);
            return commonHelper.sendResponseData(req , res , data , "Data inserted with ID"+insertId ,false, 200);    
        } catch(error){
            console.log(error);
            return commonHelper.sendResponseData(req , res , {} , "Error at backend" , true)
        }
    },
    projectList: async function(req ,res){
        try{
            let currentPage = 1;
            if(req.query.page)
                currentPage = parseInt(req.query.page);
            
                const data = {
                projects : await modelController.fetchFromDbInRange('projects' , ['*'] , 4 , currentPage-1),
                seo : seoData.seo('projectListing'),
                pagination : await commonHelper.getPaginationObject('projects' , 4 ,currentPage)
            }
                return commonHelper.sendResponseData(req , res , data , "fetched successfully" ,false,200);
            } catch(error){
                console.log(error);
                return commonHelper.sendResponseData(req , res , {} , "Error at backend" , true)
        }
    },

}

module.exports = widgetController;