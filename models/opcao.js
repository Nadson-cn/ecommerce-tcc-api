const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OpcaoSchema = Schema({
    produto: { type: Schema.Types.ObjectId, ref: "Produto", required: true },
    image: { type: String, required: true },
    skins : { type: [
        {
            nome: { type: String, required: true },
            skin: { type: String, required: true },
            skinAplicada: { type: String, required: true },
        }
    ]},
    leds : { type: [
        {
            cor: { type: String, required: true }, 
            corAplicada: { type: String, required: true }, 
        }
    ]}
    }, { timestamp: true });

module.exports = mongoose.model("Opcao", OpcaoSchema);