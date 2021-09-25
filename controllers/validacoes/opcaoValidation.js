const Joi = require("joi");

const OpcaoValidation = {
  store: {
    query:{
      produto: Joi.string().alphanum().length(24).required(),
  },
  body: {
    image: Joi.string().required(),
    skins: Joi.array().items(Joi.object({
      nome: Joi.string().required(),
      skin: Joi.string().required(),
      skinAplicada: Joi.string().required()
    })).required(), 
    leds: Joi.array().items(Joi.object({
      cor: Joi.string().required(),
      corAplicada: Joi.string().required()
    })).required() 
   }
  },


  update: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body:{
      image: Joi.string().optional(),
      skins: Joi.object({
        nome: Joi.string().required(),
        skin: Joi.string().required(),
        skinAplicada: Joi.string().required()
      }).required() 
    }
  },

  remove: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },

  index: {
    query: {
      limit: Joi.number(),
      ofset: Joi.number(),
      sortType: Joi.string(),
    }
  },

  indexDisponiveis: {
    query: {
      limit: Joi.number(),
      ofset: Joi.number(),
      sortType: Joi.string(),
    }
  },

  search: {
    query: {
      limit: Joi.number(),
      offset: Joi.number(),
      sortType: Joi.string(),
    },
    params: {
      search: Joi.string().required()
    }
  },

    index: {
      query:{
          produto: Joi.string().alphanum().length(24).required(),
      }
  }, 
  
  show:{
    query: {
      produto: Joi.string().alphanum().length(24).required()
    }
  },

  showAvaliacoes:{
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  }
}

module.exports = { OpcaoValidation };