const BookModel = require("../models/bookModel")

const getBooks = async function(req,res){
    let data = req.query
    let tosend = []
    if(!data){
        let bOoks = await BookModel.find({isDeleted:false}).lean()
        for(i of bOoks){
            // delete i['ISBN','subcategory','isDeleted','createdAt','updatedAt']
            const{ISBN,subcategory,isDeleted,createdAt,updatedAt,...Obj}=i
            tosend.push(Obj)
        }
        return res.status(200).send({status:true,data:tosend})
    }

    if(data.length==0){return res.status(404).send({status:false,message:"no books found"})}
    
    let bOoks = await BookModel.find({isDeleted:false,data}).lean()
    for(i of bOoks){
        // delete i['ISBN','subcategory','isDeleted','createdAt','updatedAt']
        const{ISBN,subcategory,isDeleted,createdAt,updatedAt,...Obj}=i
        tosend.push(Obj)
    }
    return res.status(200).send({status:true,data:tosend})

}