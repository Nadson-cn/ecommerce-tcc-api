const router = require("express").Router();
const auth = require("../../auth");
const UsuarioController = require("../../../controllers/UsuarioController");
const mongoose = require("mongoose");
const Image = mongoose.model("Image");
// const upload = require("../../../config/multer");

// const uploadUser = require('./middlewares/uploadImage');
// const Image = require('./models/Images');

const Validation = require("express-validation");
const { UsuarioValidation } = require("../../../controllers/validacoes/usuarioValidation");
const { url } = require("inspector");
const ImageKit = require("imagekit");
const fs = require("fs");

const usuarioController = new UsuarioController();

router.post("/login", Validation(UsuarioValidation.login), usuarioController.login); // PRONTO
router.post("/registrar", Validation(UsuarioValidation.store), usuarioController.store); // PRONTO
//router.put("/images/:id", auth.required, upload.single("files"), usuarioController.updateImages);
//router.post("/profile", upload.single('profile'), usuarioController.updateImages);

router.put("/", auth.required, Validation(UsuarioValidation.update), usuarioController.update); // PRONTO
router.put("/imagem-usuario", auth.required, usuarioController.updateImages); // PRONTO
router.delete("/", auth.required, usuarioController.remove); // PRONTO


router.post("/upload", async (req, res) => {
    const { base64Image, fileName } = req.body;

    // const base64Image = '';;
    // const fileName = "Default_4RJbjbfsIF.png";

    const imagekit = new ImageKit({
        publicKey : process.env.PUBLIC_KEY,
        privateKey : process.env.PRIVATE_KEY,
        urlEndpoint : process.env.URL_IMAGEKIT
    });

    const data = await imagekit.upload({
        file: base64Image,
        fileName,
    }).then(res => res);

    const url = data.url;

    return res.json({ image_url: url });
});

router.get("/recuperar-senha", usuarioController.showRecovery); // PRONTO
router.post("/recuperar-senha", usuarioController.createRecovery); // PRONTO
router.get("/senha-recuperada", usuarioController.showCompleteRecovery); // PRONTO
router.post("/senha-recuperada", usuarioController.completeRecovery); // PRONTO

router.get("/", auth.required, usuarioController.index); // PRONTO
router.get("/:id", auth.required, Validation(UsuarioValidation.show), usuarioController.show); // PRONTO  

module.exports = router;