const productModel = require("../model/productModel")
const { getImage } = require("../aws/aws")
// const {isValidPrice} = require("../validation/validator")

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
        // if (!currencyId) return res.status(400).send({ status: false, message: "Please provide currencyId" })
        // if (!currencyFormat) return res.status(400).send({ status: false, message: "Please provide currencyFormat" })        
        if (!availableSizes) return res.status(400).send({ status: false, message: "Please provide availableSizes" })

        const product = await productModel.create(data)
        return res.status(201).send({status :  true , message : "Product created successfully",data : product})
    } catch (error) {
        return res.status(500).send({status : false , message : error.message})        
    }
}

/************************************get product by query  *****************/
const getProduct = async function(req,res) {
    try {
        let data = req.query
        let { size, name, priceGreaterThan, priceLessThan, priceSort} = data
        let filter = { isDeleted: false }

        if (size) {
          size = size.split(',').map((item) => item.trim())
          for (let i = 0; i < size.length; i++) {
              // if (!validator.isValidateSize(size[i])) return res.status(400).send({ status: false, message: "Please mention valid Size" });
          }
          filter.availableSizes = { $all: size }
      }
        if (name) {
            filter.title = name
        }

        if (priceGreaterThan) {
            filter.price = { $gt: priceGreaterThan }
        }      
        if (priceLessThan) {
            filter.price = { $lt: priceLessThan }
        }

        if (priceGreaterThan && priceLessThan) {
            filter.price = { $gt: priceGreaterThan, $lt: priceLessThan }
        }

        if (priceSort) {
            if (!(priceSort == -1 || priceSort == 1)) return res.status(400).send({ status: false, message: "Please Enter '1' for Sort in Ascending Order or '-1' for Sort in Descending Order" });
        }
    
        let getProduct = await productModel.find(filter).sort({ price: priceSort })

        if (getProduct.length == 0) return res.status(404).send({ status: false, message: "Product Not Found." })

        return res.status(200).send({ status: true, message: "Success", data: getProduct })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}

/***************************************get product by id ********************/

const getproductById = async function (req, res) {
    try {
        let productId = req.params.productId;
        if (!productId) {
            return res.status(400).send({ msg: "please input product ID" })
        }
       // if (!isValidObjectId(productId)) {
           // return res.status(400).send({ status: false, msg: "productId is not valid" })
       // }
        let product = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!product) {
            return res.status(404).send({ msg: "no product found/already deleted" })
        }
        
       return  res.status(200).send({ status: true,data: product })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

/*************************************delete product  ***********************/

const deleteProduct = async function (req, res) {
    try {
        let productId = req.params.productId
        if (!productId) return res.status(400).send({ status: false, message: "ProductId is required." })
        let product = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false },
             {isDeleted: true ,deletedAt : new Date(Date.now())}, { new: true })
        if (!product) return res.status(404).send({ status: false, message: "Product you are trying to fetch is unavailable OR already deleted" })
        return res.status(200).send({ status: true, message: " product is deleted ",data : product })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = {createProduct,getProduct,deleteProduct,getproductById}
