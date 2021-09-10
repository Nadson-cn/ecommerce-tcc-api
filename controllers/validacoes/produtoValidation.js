const BaseJoi = require("joi");
const Extension = require("joi-date-extensions");
const Joi = BaseJoi.extend(Extension);

const ProdutoValidation = {
  store: {
    titulo: Joi.string().required(),
    marca: Joi.string().required(),
    categoria: Joi.string().alphanum().length(24).required(),
    preco: Joi.number().required(), 
    promocao: Joi.number(),
  },

  update: {
    params: {
      id: Joi.string().alphanum().length(24).required()
    },
    body:{
      titulo: Joi.string().optional(),
      marca: Joi.string().optional(),
      categoria: Joi.string().alphanum().length(24).optional(),
      preco: Joi.number().optional(), 
      promocao: Joi.number(),
      disponibilidade: Joi.boolean().optional()
    }
  },

  updateImages: {
    params: {
      id: Joi.string().alphanum().length(24).required()
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

  show:{
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },

  showAvaliacoes:{
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  },

  showVariacoes:{
    params: {
      id: Joi.string().alphanum().length(24).required()
    }
  }

};

module.exports = { ProdutoValidation };
