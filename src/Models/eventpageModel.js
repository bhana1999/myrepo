const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

//-----------------------Creating eventpage Schema(structure for database)-----------------//

const eventpageSchema = new mongoose.Schema(
    {
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Eventpage", eventpageSchema);


