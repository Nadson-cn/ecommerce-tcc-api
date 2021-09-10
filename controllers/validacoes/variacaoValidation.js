const Joi = require("joi");

const VariacaoValidation = {
    index: {
        query: {
            produto: Joi.string().alphanum().length(24).required()
        }
    },
    show: {
        query: {
            produto: Joi.string().alphanum().length(24).required()
        },
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    },
    store: {
        query: {
            produto: Joi.string().alphanum().length(24).required()
        },
        body: {
            quantidade: Joi.number().required(), 
        }
    },
    update: {
        query: {
            produto: Joi.string().alphanum().length(24).required()
        },
        params: {
            id: Joi.string().alphanum().length(24).required()
        },
        body: {
            quantidade: Joi.number().optional(),
        }
    },
    updateImages: {
        query: {
            produto: Joi.string().alphanum().length(24).required()
        },
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    },
    remove: {
        query: {
            produto: Joi.string().alphanum().length(24).required()
        },
        params: {
            id: Joi.string().alphanum().length(24).required()
        }
    }
};

module.exports = { VariacaoValidation };