const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

//-----------------------Creating Product Schema(structure for database)-----------------//

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 30,
            unique: true,
        },

        qtyPerUnit: {
            type: String,
            trim: true,
            required: true,
            maxlength: 2000,
        },

        unitPrice: {
            type: Number,
            trim: true,
            required: true,

        },

        unitInStock: {
            type: Number,
            required: true,
        },
        discount: {
            type: Boolean,
            default: false,
            required: true,
        },
        categoryId: {
            type: ObjectId,
            ref: "Category",
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);


