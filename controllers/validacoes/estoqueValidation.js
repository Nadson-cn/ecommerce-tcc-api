const Joi = require("joi");

const EstoqueValidation = {
    index: {
        query:{
            produto: Joi.string().alphanum().length(24).required(),
        }
    }, 

    show: {
        query:{
            produto: Joi.string().alphanum().length(24).required(),
        },
        params:{
            id: Joi.string().alphanum().length(24).required()
        }
    },

    store:{
        query:{
            produto: Joi.string().alphanum().length(24).required(),
        },
        body:{
            quantidade: Joi.number().required(),
        }
    },

    remove:{
        params:{
            id: Joi.string().alphanum().length(24).required()
        }
    }
};

module.exports = { EstoqueValidation };
