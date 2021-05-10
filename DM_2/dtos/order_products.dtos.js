const Joi = require('joi');

module.exports = Joi.object({
  products: Joi.array().items(Joi.object({
      id: Joi
        .string()
        .pattern(new RegExp(/^[0-9]+$/))
        .required(),
      count: Joi
        .number()
        .greater(0)
        .required()
    })).required()
}).required();

