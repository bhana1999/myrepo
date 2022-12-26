const orderModel = require("../model/orderModel")
const cartModel = require("../model/cartModel")
const userModel = require("../model/userModel")

const {isValidName,isValidEmail,isValidObjectId,isValidString,isValidAvailableSizes,
    isValidFile,isValidNumbers,isValidPhone,isValidPrice,isValidPassword,isValidPincode,
  } = require("../validation/validator");


 const createOrder = async function (req, res) {
    try {
      let userId = req.params.userId;
      let data = req.body;
      let cartId = data.cartId;
  
      if(Object.keys(data).length == 0)
        return res.status(400).send({status: false,message: "Please provide data in request body"});
  
      if (!isValidObjectId(userId))
        return res.status(400).send({ status: false, message: "Please provide valid User Id" });
      let findUser = await userModel.findOne({ _id: userId });
      if (!findUser)
        return res.status(404).send({ status: false, message: "not found userId" });
  
      if (!cartId)
        return res.status(400).send({ status: false, message: "cartId is required" });
      if (!isValidObjectId(cartId))
        return res.status(400).send({ status: false, message: "Please provide valid cart Id" });
  
      let findCart = await cartModel.findOne({ _id: cartId });
      if (!findCart)
        return res.status(404).send({ status: false, message: "not found cartId" });
      if (findCart.userId != userId)
        return res.status(403).send({status: false,message: "you are not allow to create this order"});
  
      let obj = {
        userId: userId,
        items: findCart.items,
        totalPrice: findCart.totalPrice,
        totalItems: findCart.totalItems,
        totalQuantity: 0,
        status: "pending",
        cancellable: true,
      };
  
      let count = 0;
      let items = findCart.items;
      for (let i = 0; i < items.length; i++) {
        count += items[i].quantity;
      }
  
      obj["totalQuantity"] = count;
  
      let finalData = await orderModel.create(obj);
  
      const updateOrder = await cartModel.findOneAndUpdate({ userId },
        { $set: { items: [], totalItems: 0, totalPrice: 0 } },
        { new: true }
      );
  
      return res.status(201).send({ status: true, message: "Success", data: finalData,});
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };

  module.exports ={createOrder}