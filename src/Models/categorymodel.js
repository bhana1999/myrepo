const mongoose = require("mongoose");

//---------------------Creating Category Schema(Structure for database)--------------------------------------//

const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema); // data saved in collection name Category //
