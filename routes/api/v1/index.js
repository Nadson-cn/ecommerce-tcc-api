const router = require("express").Router();

router.use("/usuarios", require("./usuarios")); 
router.use("/clientes", require("./clientes")); 

router.use("/categorias", require("./categorias")); 
router.use("/produtos", require("./produtos")); 
router.use("/avaliacoes", require("./avaliacoes")); 
router.use("/estoque", require("./variacoes")); 
router.use("/opcao", require("./opcoes")); 

router.use("/pedidos", require("./pedidos")); 

module.exports = router;