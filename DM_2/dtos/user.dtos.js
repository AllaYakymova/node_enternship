const Joi = require('joi');

module.exports = Joi.object({
  username: Joi
    .string()
    .ruleset.min(4).max(50).rule({ message: 'Name must be between 4 and 50' })
    .pattern(new RegExp(/^[a-zA-zА-яа-я -]+$/)),
  userphone: Joi
    .string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  useremail: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  userpassword: Joi
    .string()
    .ruleset.min(4).max(10).rule({ message: 'Password must be between 4 and 10' })
    .required()
}).required()
  .with('userphone', 'userpassword');
