const router = require("express").Router();
const auth = require("../../auth");
const UsuarioController = require("../../../controllers/UsuarioController");

const Validation = require("express-validation");
const { UsuarioValidation } = require("../../../controllers/validacoes/usuarioValidation");

const usuarioController = new UsuarioController();

router.post("/login", Validation(UsuarioValidation.login), usuarioController.login); // PRONTO
router.post("/registrar", Validation(UsuarioValidation.store), usuarioController.store); // PRONTO
router.put("/", auth.required, Validation(UsuarioValidation.update), usuarioController.update); // PRONTO
router.delete("/", auth.required, usuarioController.remove); // PRONTO

router.get("/recuperar-senha", usuarioController.showRecovery); // PRONTO
router.post("/recuperar-senha", usuarioController.createRecovery); // PRONTO
router.get("/senha-recuperada", usuarioController.showCompleteRecovery); // PRONTO
router.post("/senha-recuperada", usuarioController.completeRecovery); // PRONTO

router.get("/", auth.required, usuarioController.index); // PRONTO
router.get("/:id", auth.required, Validation(UsuarioValidation.show), usuarioController.show); // PRONTO  

module.exports = router;