const productmodel = require("../Models/productmodel")
const { isValidObjectId } = require("mongoose")

//-------------Function to Create Products---------------------------------------//

const createproduct = async function (req, res) {

    try {

        let data = req.body;
        let { productName, qtyPerUnit, unitPrice, unitInStock, categoryId } = data

        if (!productName) { res.status(400).send({ status: false, msg: "productName is required" }) }

        let duplicateProduct = await productmodel.findOne({ productName })

        if (duplicateProduct) return res.status(400).send({ status: false, message: " productName is already exist" })

        if (!qtyPerUnit) { res.status(400).send({ status: false, msg: "qtyPerUnit is required" }) }

        if (!unitPrice) { res.status(400).send({ status: false, msg: "unitPrice is required" }) }

        if (!unitInStock) { res.status(400).send({ status: false, msg: "unitInStock is required" }) }

        if (!categoryId) { res.status(400).send({ status: false, msg: "categoryId is required" }) }


        if (!isValidObjectId(categoryId)) return res.status(400).send({ status: false, msg: "CategoryId is not valid" })

        let newdata = await productmodel.create(data);

        return res.status(201).send({ msg: newdata })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

//-------------------Function to get particular product by its Id-----------------------//

const getproductById = async function (req, res) {
    try {
        const productId = req.params.productId;

        if (!productId) return res.status(400).send({ msg: "please input product ID" });
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, msg: "productId is not valid" })


        const product = await productmodel.findOne({ _id: productId, isDeleted: false, }).populate("categoryId")
        if (!product) return res.status(404).send({ msg: "No product found" })

        return res.status(200).send({ status: true, message: "Success", data: product });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

//------------------------- Function to get all products -----------------------//
const getProduct = async function (req, res) {

    try {

        let data = req.query
        data.isdeleted = false
        let products = await productmodel.find(data).populate("categoryId")
        if (products) {
            return res.status(200).send({ msg: products })
        } else return res.status(404).send("Data not found")
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

//--------------------------Function to delete particular Product----------------------//

const deleteProduct = async function (req, res) {
    try {
        const productId = req.params.productId

        if (!productId) return res.status(400).send({ status: false, message: "ProductId is required." })
        if (!isValidObjectId(productId)) return res.status(400).send({ status: false, message: `${productId} is invalid` });

        const deletedProduct = await productmodel.findOneAndUpdate(
            { _id: productId, isDeleted: false },
            { isDeleted: true },
            { new: true })

        if (!deletedProduct) return res.status(404).send({ status: false, message: "Product you are trying to fetch is unavailable OR already deleted" })

        return res.status(200).send({ status: true, message: " product is deleted " })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//--------------------------Function to update particular Product-----------------------//
const UpdateProduct = async function (req, res) {

    try {
        let data = req.body;
        let ProductId = req.params.ProductId;

        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: 'Enter Product Details' })
        if (!ProductId)
            return res.status(400).send({ status: false, msg: 'ProductId is missing' })

        let findProductId = await productmodel.findById(ProductId);

        if (findProductId.isdeleted == true) {
            return res.status(400).send({ status: false, msg: "Product is deleted" })

        }

        const Updateddata = await productmodel.findOneAndUpdate({ _id: ProductId, isDeleted: false }, data, { new: true })
        if (!Updateddata) { return res.status(404).send({ status: false, msg: "No Product found" }) }
        return res.status(200).send({ status: true, data: Updateddata })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createproduct, getproductById, getProduct, deleteProduct, UpdateProduct };
