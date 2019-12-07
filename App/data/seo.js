const data = {
    seo : function(type , data){
        switch(type){
            case 'home':
                return {
                    title : "this is home page",
                    pageDescription : "This contins projects"
                }
            case 'projectListing':
                return {
                    title : "this is project listing page",
                    pageDescription : "This is description of project listing"
                }
            case 'blogListing':
            return  {     
                    title: "this is blog listing page",    
                    pageDescription : "This is description of project listing"
                }
            case 'blogDetail' : 
                return {
                    title: data && data.title,    
                    pageDescription : data && data.pageDescription
                }
            case 'wishList':
                return {
                    title: "This is wishlist page",    
                    pageDescription : "This is descriptionn for wishlist"    
                }
        }
    }
}
module.exports = data;