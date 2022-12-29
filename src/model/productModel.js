const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String,
       required: true,
        unique: true, 
        trim: true 
      },
    description: { 
      type: String, 
      required: true,
       trim: true 
      },
    price: { 
      type: Number,
      required: true
       },
    currencyId: { 
      type: String, 
      required: true, 
      default: "INR" 
    },
    currencyFormat: {
       type: String,
        required: true, 
        default: "₹" 
      },
    isFreeShipping: {
       type: Boolean, 
       default: false 
      },
    productImage: { 
      type: String, 
      required: true 
    },
    style: { 
      type: String, 
      trim: true 
    },
    availableSizes: {
      type: [String],
      required: true,
      enum: ["S", "XS", "M", "X", "L", "XXL", "XL"],
    }, //at least one size
    installments: { 
      type: Number 
    },
    deletedAt: { 
      type: Date,
      default: null 
      },
    isDeleted: { 
      type: Boolean, 
      default: false
     },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
