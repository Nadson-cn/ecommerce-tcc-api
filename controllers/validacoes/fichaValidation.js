const Joi = require("joi");

const FichaValidation = {
  store: {
    query:{
      produto: Joi.string().alphanum().length(24).required(),
  },
  //Joi.array().items(Joi.object({
  body: {
    especificacoes: Joi.array().items(Joi.object({
      formato: Joi.string(),
      cor_exterior: Joi.string(),
      painel_lateral: Joi.string()
    })).required(),
    baias: Joi.array().items(Joi.string()).optional(), 
    placa_mae: Joi.array().items(Joi.string()).optional(), 
    dimensoes: Joi.string().optional(),
   }
  },


  update: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body:{
        especificacoes: Joi.array().items(Joi.string()).optional(),
        baias: Joi.array().items(Joi.string()).optional(), 
        placa_mae: Joi.array().items(Joi.string()).optional(), 
        dimensoes: Joi.string().optional(),
    }},

  remove: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },

    index: {
      query:{
          produto: Joi.string().alphanum().length(24).required(),
      }
  }, 
  
  show:{
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  }
}
module.exports = { FichaValidation };