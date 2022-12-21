const productModel = require("../model/productModel")
const { getImage } = require("../aws/aws")

/****************************** create product  *******************************/

const createProduct = async function(req,res){
    try {
        const data = req.body
        const {title,description,price,currencyId,currencyFormat,isFreeShipping,
            style,availableSizes,installments,isDeleted} = data

        let files = req.files
        if (!files) return res.status(400).send({ status: false, message: "Please provide Product Image" })
        data.productImage = await getImage(files)
        
        if (!title) return res.status(400).send({ status: false, message: "Please provide Title" })
        if (!description) return res.status(400).send({ status: false, message: "Please provide description" })
        if (!price) return res.status(400).send({ status: false, message: "Please provide price" })
        if (!currencyId) return res.status(400).send({ status: false, message: "Please provide currencyId" })
        if (!currencyFormat) return res.status(400).send({ status: false, message: "Please provide currencyFormat" })        
        if (!availableSizes) return res.status(400).send({ status: false, message: "Please provide availableSizes" })

        const product = await productModel.create(data)
        return res.status(201).send({status :  true , message : "Product created successfully",data : product})
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})        
    }
}


module.exports = {createProduct}