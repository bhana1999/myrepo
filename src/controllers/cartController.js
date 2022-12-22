const cartModel = require("../model/cartModel")
const productModel = require("../model/productModel")
const userModel = require("../model/userModel")

const createCart = async function(req,res){
    try {
        let data = req.body
        let userId = req.params.userId
        const {productId,quantity} = data  

        if(!userId) return res.status(400).send({status : false , message : "please  provide userId "})
        const user = await userModel.findOne({_id : userId})
        if(!user) return res.status(404).send({status : false , message : "user not found "})

        if(!productId) return res.status(400).send({status : false , message : "please  provide productId "})
        const product = await productModel.findOne({ _id : productId , isDeleted : false})
        let totalPrice = product.price * quantity
        if(!product) return res.status(404).send({status : false , message : "product not found "})

        const cartFind = await cartModel.findOne({userId : userId})
        
        if(!cartFind) {
            let items = [ {
                productId: productId,
                quantity: quantity
              }]
            
            let totalItems = items.length
            const cart = await cartModel.create({
                    userId : userId,
                    items:items,
                    totalPrice : totalPrice,
                    totalItems : totalItems})
            
            return res.status(201).send({status : true , message : "cart created sussuessfully",data : cart})    

        }
        else{
            let items = [ {
                productId: productId,
                quantity: quantity
              }]
    
            let totalItems = items.length
            
            const cart = await cartModel.findOneAndUpdate(
                {userId : userId },
                {
                    $push : {items : items},
                    $inc : {totalPrice : totalPrice , totalItems : totalItems},
                },
                {new :true}
                )
    
            return res.status(201).send({status : true , message : "cart created sussuessfully",data : cart})        

        }

    } catch (error) {
        return res.status(500).send({status : false , message : error.message})
        
    }
}

module.exports = {createCart}

