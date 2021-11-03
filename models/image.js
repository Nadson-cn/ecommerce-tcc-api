const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = Schema({
    image: { type: String },
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
},{ timestamps: true });

module.exports = mongoose.model("Image", ImageSchema);