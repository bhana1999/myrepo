const productModel = require("../model/productModel");
const { getImage } = require("../aws/aws");
const {
  isValidName,
  isValidEmail,
  isValidObjectId,
  isValidString,
  isValidAvailableSizes,
  isValidFile,
  isValidNumbers,
  isValidPhone,
  isValidPrice,
  isValidPassword,
  isValidPincode,
} = require("../validation/validator");

/****************************** create product  *******************************/
<<<<<<< HEAD

const createProduct = async function (req, res) {
  try {
    const data = req.body;
    const {
      title,
      description,
      price,
      currencyId,
      currencyFormat,
      isFreeShipping,
      style,
      availableSizes,
      installments,
      isDeleted,
    } = data;
=======
const createProduct = async function(req,res){
    try {
        const data = req.body
        const {title,description,price,currencyId,currencyFormat,isFreeShipping,
            style,availableSizes,installments,isDeleted} = data
>>>>>>> 24542ed9a8064e8e73f01a24c2cdffbd24ea6bc0

    let files = req.files;
    if (!files)
      return res
        .status(400)
        .send({ status: false, message: "Please provide Product Image" });
    data.productImage = await getImage(files);

    if (!title)
      return res
        .status(400)
        .send({ status: false, message: "Please provide Title" });
    if (!description)
      return res
        .status(400)
        .send({ status: false, message: "Please provide description" });
    if (!price)
      return res
        .status(400)
        .send({ status: false, message: "Please provide price" });
    // if (!currencyId) return res.status(400).send({ status: false, message: "Please provide currencyId" })
    // if (!currencyFormat) return res.status(400).send({ status: false, message: "Please provide currencyFormat" })
    if (!availableSizes)
      return res
        .status(400)
        .send({ status: false, message: "Please provide availableSizes" });

    const product = await productModel.create(data);
    return res
      .status(201)
      .send({
        status: true,
        message: "Product created successfully",
        data: product,
      });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/************************************get product by query  *****************/
const getProduct = async function (req, res) {
  try {
    let data = req.query;
    let { size, name, priceGreaterThan, priceLessThan, priceSort } = data;
    let filter = { isDeleted: false };

    if (size) {
      size = size.split(",").map((item) => item.trim());
      for (let i = 0; i < size.length; i++) {
        // if (!validator.isValidateSize(size[i])) return res.status(400).send({ status: false, message: "Please mention valid Size" });
      }
      filter.availableSizes = { $all: size };
    }
    if (name) {
      filter.title = name;
    }

    if (priceGreaterThan) {
      filter.price = { $gt: priceGreaterThan };
    }
    if (priceLessThan) {
      filter.price = { $lt: priceLessThan };
    }

    if (priceGreaterThan && priceLessThan) {
      filter.price = { $gt: priceGreaterThan, $lt: priceLessThan };
    }

    if (priceSort) {
      if (!(priceSort == -1 || priceSort == 1))
        return res
          .status(400)
          .send({
            status: false,
            message:
              "Please Enter '1' for Sort in Ascending Order or '-1' for Sort in Descending Order",
          });
    }

    let getProduct = await productModel.find(filter).sort({ price: priceSort });

    if (getProduct.length == 0)
      return res
        .status(404)
        .send({ status: false, message: "Product Not Found." });

    return res
      .status(200)
      .send({ status: true, message: "Success", data: getProduct });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/***************************************get product by id ********************/
const getproductById = async function (req, res) {
  try {
    let productId = req.params.productId;
    if (!productId) {
      return res.status(400).send({ msg: "please input product ID" });
    }
    // if (!isValidObjectId(productId)) {
    // return res.status(400).send({ status: false, msg: "productId is not valid" })
    // }
    let product = await productModel.findOne({
      _id: productId,
      isDeleted: false,
    });
    if (!product) {
      return res.status(404).send({ msg: "no product found/already deleted" });
    }

    return res.status(200).send({ status: true, data: product });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

/****************************update product**********************************/
let updateProduct = async function (req, res) {
<<<<<<< HEAD
  try {
    let data = req.body;
    let productId = req.params.productId;
    let files = req.files;
    let update = {};
    let addtoSet = {};

    let {
      title,
      description,
      price,
      isFreeShipping,
      style,
      availableSizes,
      installments,
    } = data;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Please provide data in the request body!",
        });
=======
    try {
      let data = req.body
      let productId = req.params.productId;
      let files = req.files;
      let { title,description,price,isFreeShipping,style,availableSizes,installments,} = data;
  
      if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please provide data in the request body!"});
  
      if (title) {
        if (!isValidName(title)) return res.status(400).send({ status: false, message: "title is invalid" });

        const uniquetitle = await productModel.findOne({ title: title });
        if (uniquetitle) return res.status(409).send({ status: false, message: "title is already present" });
      }
  
      if (description) {
        if (!isValidName(description)) return res.status(400).send({ status: false, message: "description is invalid" });
      }
  
      if (price) {
        if (!isValidPrice(price)) return res.status(400).send({ status: false, message: "Price is invalid!" });
      }
  
      if (files && files.length > 0) {
        if (!isValidFile(files[0].mimetype)) return res.status(400).send({ status: false, message: "Enter formate jpeg/jpg/png only." });
        var uploadedFileURL = await aws.uploadFile(files[0]);

      } else if (Object.keys(data).includes("productImage")) {
        return res.status(400).send({ status: false, message: "please put the productImage" });
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
        if (!(isFreeShipping == "true" || isFreeShipping == "false")) return res.status(400).send({ status: false,message: "isFreeShipping should either be True, or False."});
      }
  
      if (!isValidObjectId(productId)) return res.status(400).send({ status: false, msg: "Product-id is not valid!" });
  
      let CheckProduct = await productModel.findById(productId);
      if (!CheckProduct) return res.status(404).send({ status: false, message: "Product not found!" });
  
      let updateProduct = await productModel.findOneAndUpdate(
        { _id: productId },
        { $set :{
            title : title,
            description : description,
            price : price,
            productImage : uploadedFileURL,
            style : style,
            installments:installments,
            isFreeShipping :isFreeShipping
        }, 
        $push : {availableSizes : availableSizes}},
        { new: true }
      );
  
      return res.status(200).send({status: true,message: "Product successfully updated",data: updateProduct,});
    } catch (error) {
      res.status(500).send({ status: false, err: error.message });
>>>>>>> 24542ed9a8064e8e73f01a24c2cdffbd24ea6bc0
    }

    if (title) {
      if (!isValidName(title)) {
        return res
          .status(400)
          .send({ status: false, message: "title is invalid" });
      }
      const uniquetitle = await productModel.findOne({ title: title });
      if (uniquetitle) {
        return res
          .status(400)
          .send({ status: false, message: "title is already present" });
      }
      update["title"] = title;
    }

    if (description) {
      if (!isValidName(description)) {
        return res
          .status(400)
          .send({ status: false, message: "description is invalid" });
      }
      update["description"] = description;
    }

    if (price) {
      if (!isValidPrice(price)) {
        return res
          .status(400)
          .send({ status: false, message: "Price is invalid!" });
      }
      update["price"] = price;
    }

    if (files && files.length > 0) {
      if (!isValidFile(files[0].originalname))
        return res
          .status(400)
          .send({ status: false, message: "Enter formate jpeg/jpg/png only." });

      let uploadedFileURL = await aws.uploadFile(files[0]);

      update["productImage"] = uploadedFileURL;
    } else if (Object.keys(data).includes("productImage")) {
      return res
        .status(400)
        .send({ status: false, message: "please put the productImage" });
    }

    if (style) {
      if (!isValidName(style)) {
        return res
          .status(400)
          .send({ status: false, message: "Style is invalid!" });
      }
      update["style"] = style;
    }

    if (installments) {
      if (!isValidNumbers(installments)) {
        return res
          .status(400)
          .send({
            status: false,
            message: "Installments should be a Number only",
          });
      }
      update["installments"] = installments;
    }

    if (availableSizes) {
      availableSizes = availableSizes.split(",").map((x) => x.trim());
      if (!isValidAvailableSizes(availableSizes))
        return res
          .status(400)
          .send({
            status: false,
            message: "availableSizes is required or put valid sizes",
          });
      addtoSet["availableSizes"] = { $each: availableSizes };
    }

    if (isFreeShipping) {
      if (!(isFreeShipping == "true" || isFreeShipping == "false")) {
        return res
          .status(400)
          .send({
            status: false,
            message: "isFreeShipping should either be True, or False.",
          });
      }
      update["isFreeShipping"] = isFreeShipping;
    }

    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .send({ status: false, msg: "Product-id is not valid!" });
    }

    let CheckProduct = await productModel.findById(productId);
    if (!CheckProduct) {
      return res
        .status(404)
        .send({ status: false, message: "Product not found!" });
    }

    let updateProduct = await productModel.findOneAndUpdate(
      { _id: productId },
      { update, $addToSet: addtoSet },
      { new: true }
    );

    return res
      .status(200)
      .send({
        status: true,
        message: "Product successfully updated",
        data: updateProduct,
      });
  } catch (error) {
    res.status(500).send({ status: false, err: error.message });
  }
};

/*************************************delete product  ***********************/

const deleteProduct = async function (req, res) {
  try {
    let productId = req.params.productId;
    if (!productId)
      return res.status(400).send({ status: false, message: "ProductId is required." });

      
    let product = await productModel.findOneAndUpdate(
      { _id: productId, isDeleted: false },
      { isDeleted: true, deletedAt: new Date(Date.now()) },
      { new: true }
    );
    if (!product)
      return res
        .status(404)
        .send({
          status: false,
          message:
            "Product you are trying to fetch is unavailable OR already deleted",
        });
    return res
      .status(200)
      .send({ status: true, message: " product is deleted ", data: product });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getproductById,
  updateProduct,
  deleteProduct,
};
