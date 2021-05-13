const Joi = require('joi');

module.exports = Joi.object({
  productId: Joi
    .string()
    .pattern(new RegExp(/^[0-9]+$/)),
  categories: Joi
    .number()
    .greater(0)
    .less(20),
  manufactures: Joi
    .string(),
  products: Joi
    .string(),
});
