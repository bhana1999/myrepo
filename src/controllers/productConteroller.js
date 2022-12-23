const productModel = require("../model/productModel");
const { getImage } = require("../aws/aws");
const {isValidName,isValidEmail,isValidObjectId,isValidString,isValidAvailableSizes,
  isValidFile,isValidNumbers,isValidPhone,isValidPrice,isValidPassword,isValidPincode,
} = require("../validation/validator");

/****************************** create product  *******************************/
const createProduct = async function(req,res){
    try {
        let data = req.body
        let files = req.files;
        let {title,description,price,currencyId,currencyFormat,
          availableSizes,installments,isFreeShipping} = data

        if(Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please provide data" });

        if(!files) return res.status(400).send({ status: false, message: "Please provide Product Image" });
        if (files && files.length > 0) {
          if (files.length > 1) return res.status(400).send({ status: false, message: "You can't enter more than one file for Update!" })
          let uploadedURL = await getImage(files)
          data.productImage = uploadedURL
        }

        if(!title) return res.status(400).send({ status: false, message: "Please provide Title" });
        if(!isValidString(title) || !isValidName(title)) return res.status(400).send({status : false , message :"please provide valid title"})
        
        if (!description) return res.status(400).send({ status: false, message: "Please provide description" });
        if(!isValidName(description)) return res.status(400).send({status : false , message :"please provide valid description"})

        if (!price) return res.status(400).send({ status: false, message: "Please provide price" });
        if(!isValidNumbers(price)) return res.status(400).send({status : false , message :"please provide valid price"})

        if (!currencyId) return res.status(400).send({ status: false, message: "Currency Id is required!" });
        if (currencyId != "INR") return res.status(400).send({status: false, msg: "Please provide the currencyId as `INR`!",});
        
        if (!currencyFormat) return res.status(400).send({ status: false, message: "Currency Format is required!" });
        if (currencyFormat != "₹") return res.status(400).send({status: false, message: "Please provide the currencyformat as `₹`!",})

        if (!availableSizes) return res.status(400).send({ status: false, message: "Please provide availableSizes" });
        availableSizes = availableSizes.split(",").map((item) => item.trim());
        for (let i = 0; i < availableSizes.length; i++) {
          if(!isValidAvailableSizes(availableSizes[i])) return res.status(400).send({ status: false, message: "Please provide size from S, XS, M, X, L, XXL, XL" });
        }

        if(installments){
          if(!isValidNumbers(installments)) return res.status(400).send({status :  false , message : "please provid valid Installment"})
        }

        const product = await productModel.create(data);
        return res.status(201).send({status: true,message: "Product created successfully",data: product,});

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/************************************get product by query  *****************/
const getProduct = async function (req, res) {
  try {
    const queries = req.query;
    const { size, name, priceGreaterThan, priceLessThan, priceSort } = queries;

    let filter = { isDeleted: false };

    if (size) {
      size = size.split(",").map((item) => item.trim());
      for (let i = 0; i < size.length; i++) {
        if(!isValidAvailableSizes(size[i])) return res.status(400).send({ status: false, message: "Please provide size from S, XS, M, X, L, XXL, XL" });
      }
      filter.availableSizes = { $all: size };
    }
    if (name) {
      if(!isValidName(name)) return res.status(400).send({status : false , message :"please provide valid name"})
      filter.title = name;
    }

    if (!priceLessThan || priceGreaterThan) {
      if(!isValidPrice(priceGreaterThan)) return res.status(400).send({status : false , message :"please provide valid price"})
      filter.price = { $gt: priceGreaterThan };
    }

    if (!priceGreaterThan ||  priceLessThan) {
      if(!isValidPrice(priceLessThan)) return res.status(400).send({status : false , message :"please provide valid price"})
      filter.price = { $lt: priceLessThan };
    }

    if (!priceGreaterThan &&  !priceLessThan) return res.status(400).send({status : false , message : "Please provid either priceGreaterThan or priceLessThan"})

    if (priceGreaterThan && priceLessThan) {
      if(!isValidPrice(priceGreaterThan)) return res.status(400).send({status : false , message :"please provide valid price"})
      if(!isValidPrice(priceLessThan)) return res.status(400).send({status : false , message :"please provide valid price"})
      if(priceGreaterThan == priceLessThan) return res.status(400).send({status : false , message :"priceGreaterThan and priceLessThan cannot be equal"})
      
      filter.price = { $gt: priceGreaterThan, $lt: priceLessThan };
    }

    if (priceSort) {
      if (!(priceSort == -1 || priceSort == 1)) return res.status(400).send({status: false,message:"Please Enter '1' for Sort in Ascending Order or '-1' for Sort in Descending Order",});
    }
    
    let products = await productModel.find(filter).sort({ price: priceSort });

    if (!products) return res.status(404).send({ status: false, message: "Product Not Found." });

    return res.status(200).send({ status: true, message: "List of product", data : products });
  
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/***************************************get product by id ********************/
const getproductById = async function (req, res) {
  try {
    const productId = req.params.productId;

    if (!productId) return res.status(400).send({ msg: "please input product ID" });
    if (!isValidObjectId(productId)) return res.status(400).send({ status: false, msg: "productId is not valid" })

    const product = await productModel.findOne({_id: productId,isDeleted: false,});

    if (!product) return res.status(404).send({ msg: "no product found / already deleted" })

    return res.status(200).send({ status: true,message : "get product successfully", data: product });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

/****************************update product**********************************/
let updateProduct = async function (req, res) {
    try {
      let data = req.body
      let productId = req.params.productId;
      let files = req.files;
      let { title,description,price,productImage,isFreeShipping,style,availableSizes,installments,} = data;
  
      if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please provide data in the request body!"});
      
      if (!isValidObjectId(productId)) return res.status(400).send({ status: false, msg: "Product-id is not valid!" });
      if (title) {
        if(!isValidString(title) || !isValidName(title)) return res.status(400).send({status : false , message :"please provide valid title"})
        const uniquetitle = await productModel.findOne({ title: title });
        if (uniquetitle) return res.status(409).send({ status: false, message: "title is already present" });
      }
  
      if (description) {
        if (!isValidName(description)) return res.status(400).send({ status: false, message: "description is invalid" });
      }
  
      if (price) {
        if (!isValidPrice(price)) return res.status(400).send({ status: false, message: "Price is invalid!" });
      }
      
      if (style) {
        if (!isValidName(style)) return res.status(400).send({ status: false, message: "Style is invalid!" });
      }
  
      if (installments) {
        if (!isValidNumbers(installments)) return res.status(400).send({ status: false, message: "Installments should be a Number only"});
      }
  
      if (availableSizes) {
        availableSizes = availableSizes.split(",").map((x) => x.trim());
        if (!isValidAvailableSizes(availableSizes)) return res.status(400).send({status: false, message: "availableSizes is required or put valid sizes" });
      }
  
      if (isFreeShipping) {
        if (!(isFreeShipping == true || isFreeShipping == false)) return res.status(400).send({ status: false,message: "isFreeShipping should either be True, or False."});
      }
    
      if (files && files.length > 0) {
        if (files.length > 1) return res.status(400).send({ status: false, message: "You can't enter more than one file for Update!" })
        productImage = await getImage(files)
      }

      const CheckProduct = await productModel.findOne({_id :productId ,isDeleted : false});
      if (!CheckProduct) return res.status(404).send({ status: false, message: "Product not found " });
      
      const updateProduct = await productModel.findOneAndUpdate(
        { _id: productId ,isDeleted : false},
        { $set :{
            title : title,
            description : description,
            price : price,
            productImage : productImage,
            style : style,
            installments:installments,
            isFreeShipping :isFreeShipping
        }, 
        $push : {availableSizes : availableSizes}},
        { new: true }
      );

      if (!updateProduct) return res.status(400).send({ status: false, message: "product is already deleted" });

  
      return res.status(200).send({status: true,message: "Product successfully updated",data: updateProduct,});
    } catch (error) {
      res.status(500).send({ status: false, err: error.message });
    }
};

/******************************delete Product ********************************/
const deleteProduct = async function (req, res) {
    try {
        const productId = req.params.productId

        if (!productId) return res.status(400).send({ status: false, message: "ProductId is required." })
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: `${productId} is invalid` });
        
        const deletedProduct = await productModel.findOneAndUpdate(
          { _id: productId, isDeleted: false }, 
          { isDeleted: true , deletedAt : Date.now()}, 
          { new: true })

        if (!deletedProduct) return res.status(404).send({ status: false, message: "Product you are trying to fetch is unavailable OR already deleted" })
        
        return res.status(200).send({ status: true, message: " product is deleted " })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = {createProduct,getProduct,getproductById,updateProduct,deleteProduct,};
