const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

//-----------------------Creating NFTs Schema(structure for database)------------

// define the NFT schema
const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
  owner: {
    type: String,
    required: true
  }
},{ timestamps: true }
 );

// define the NFT model
module.exports = mongoose.model("NFTs",  nftSchema);


