const Joi = require("joi");

const CategoriaValidation = {
  index: {
  /*  
    query: {
      //loja: Joi.string().alphanum().length(24).required()
    }
  */  
  },

  indexDisponiveis: {
  /*  
    query: {
      //loja: Joi.string().alphanum().length(24).required()
    }
  */  
  },

  show:{
   query: {
     // loja: Joi.string().alphanum().length(24).required()
    },
 
    params: {
      //id: Joi.string().alphanum().length(24).required()
      nome: Joi.string().required()
    }
  },

  store: {
    body: {
      nome: Joi.string().required()
    }
  },

  update: {
    params:{
      id: Joi.string().required()
    },
    body: {
      nome: Joi.string().optional(),
      disponibilidade: Joi.boolean().optional(),
      produtos: Joi.array().items(Joi.string().alphanum().length(24).optional())
    }
  },
  remove: {
    params:{
      id: Joi.string().required()
    }
  }
};

module.exports = { CategoriaValidation };