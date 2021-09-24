const router = require("express").Router();

const Validation = require("express-validation");
const { FichaValidation } = require("../../../controllers/validacoes/fichaValidation");

const FichaController  = require("../../../controllers/FichaController");
const fichaController = new FichaController();

router.get("/", fichaController.index);
router.get("/:id", Validation(FichaValidation.show), fichaController.show);
router.post("/", Validation(FichaValidation.store), fichaController.store);
router.put("/:id", Validation(FichaValidation.update), fichaController.update);

router.delete("/:id", fichaController.remove);


module.exports = router;