const router = require("express").Router();

const Validation = require("express-validation");
const { OpcaoValidation } = require("../../../controllers/validacoes/opcaoValidation");

const OpcaoController  = require("../../../controllers/OpcaoController");
const opcaoController = new OpcaoController();

router.get("/all", opcaoController.index);
router.get("/", Validation(OpcaoValidation.show), opcaoController.show);
router.post("/", Validation(OpcaoValidation.store), opcaoController.store);

router.delete("/:id", opcaoController.remove);


module.exports = router;