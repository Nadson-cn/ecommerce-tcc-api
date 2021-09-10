const Joi = require("joi");

const PedidoValidation = {
    indexAdmin: {
        query: {
            offset: Joi.number().required(),
            limit: Joi.number().required()
        }
    },

    showAdmin: {
        parmas: {
            id: Joi.string().alphanum().length(24).required()
        }
    },

    removeAdmin: {
        parmas: {
            id: Joi.string().alphanum().length(24).required()
        }
    },

    showCarrinhoPedidoAdmin: {
        parmas: {
            id: Joi.string().alphanum().length(24).required()
        }
    },

    index: {
        query: {
            offset: Joi.number().required(),
            limit: Joi.number().required()
        }
    },

    show: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    },

    remove: {
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    },

    showCarrinhoPedido: {
        query: {
            id: Joi.string().alphanum().length(24).required()
        }
    },

    store: {
        body: {
            carrinho: Joi.array().items(Joi.object({
                produto: Joi.string().alphanum().length(24).required(),
                quantidade: Joi.number().required()
            })).required()
        }
    }

};

module.exports = { PedidoValidation };