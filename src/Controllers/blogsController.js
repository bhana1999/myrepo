
const blogsModel = require("../Models/blogsModel");
const blogsmodel = require("../Models/blogsModel")


const createblogs = async function (req,res){

try {

    let data = req.body

    let blog = await blogsmodel.create(data)

    return res.status(201).send({status: true , msg: blog})

    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

const getblogs = async function (req,res){

    try {

        let data = req.query

        data.isdeleted = false
        data.isPublished = true

        let filtered = await blogsmodel.find(data).populate("authorid")

        //console.log(filtered);

        if (filtered){
        return res.status(200).send({msg: filtered})

        }else return res.status(404).send ("data not found") 
        
    } catch (error) {
       return res.status(500).send({ msg: error.message })
    }
}

const updatedblogs = async function (req, res) {
    
    try {
        let data = req.body;
        let blogId = req.params.blogId;

        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: 'Enter blog Details' })
        if (!blogId)
            return res.status(400).send({ status: false, msg: 'BlogId is missing' })

        let findBlogId = await blogsModel.findById(blogId);

        if (findBlogId.isdeleted == true) {
            return res.status(400).send({ status: false, msg: "Blog is deleted" })

        }
        let updatedblogs = await blogsModel.findOneAndUpdate({ _id: blogId }, {
            $set: {
                tittle: data.tittle,
                body: data.body,
                publishedAt: new Date(),
                isPublished: true,
            },
            $push: { tags: req.body.tags, subcategory: req.body.subcategory },
        },
            { new: true, upsert: true },
        );
        return res.status(200).send({ status: true, msg: updatedblogs });
        
    } catch (err) {
       return res.status(500).send({ status: false, msg: err.message })
    }
}

const deleted = async function (req,res){

    try {
        let blogId = req.params.blogId;

        if (!blogId)
            return res.status(400).send({ status: false, msg: 'BlogId is missing' })
    
        let blog = await blogsModel.findById({_id:blogId})

        if(!blog){return res.status(404).send({ status: false, msg: "Blogid dont exit" })}

        if (blog.isdeleted==true) {
            return res.status(400).send({ status: false, msg: "Blogs is already deleted" })
        }
        
        await blogsModel.findOneAndUpdate({ _id: blogId }, {
            $set: {
                deletedAt: new Date(),
                isdeleted: true,
            }
        },
            { new: true, upsert: true },
        );

        return res.status(200).send({status:true,Msg: "deleted succesfully"})
        
    } catch (err) {
         return res.status(500).send({ status: false, msg: err.message })
    }
}

    
const DeleteBlogsByQuery = async function (req, res) {

try {

      let data = req.query;
      
      if (Object.keys(data).length == 0) {

        return res.status(400).send({ status: false, msg: "query is required" });}
        
        // let filtered = await blogsmodel.find(data).populate("authorid")

        // if(filtered.length == 0){res.status(404).send("not find")}

        // let ID = filtered[0].authorid


      const deleteData = await blogsModel.updateMany(
        { $and: [data, { isdeleted: false }] },
        { $set: { isdeleted: true ,deletedAt : new Date()}}
      );

    if (deleteData.modifiedCount == 0)
        return res.status(404).send({ status: false, msg: "No blog are found for Update" });
  
    res.status(200).send({status: true,deleteData});

    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message });
    }
  };

module.exports.createblogs = createblogs
module.exports.getblogs = getblogs
module.exports.updatedblogs = updatedblogs
module.exports.deleted = deleted
module.exports.DeleteBlogByQuery = DeleteBlogsByQuery

