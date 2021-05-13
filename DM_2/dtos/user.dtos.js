const Joi = require('joi');

module.exports = Joi.object({
  username: Joi
    .string()
    .ruleset.min(4).max(50).rule({ message: 'Name must be between 4 and 50' })
    .pattern(new RegExp(/^[a-zA-zА-яа-я -]+$/)),
  userphone: Joi
    .string()
    .pattern(new RegExp(/^[a-zA-Z0-9]{10}$/))
    .ruleset.min(10).max(10).rule({ message: 'Phone must be 10 numbers' })
    .required(),
  useremail: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .pattern(new RegExp(/^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/)),
  userpassword: Joi
    .string()
    .ruleset.min(4).max(10).rule({ message: 'Password must be between 4 and 10' })
    .pattern(new RegExp(/^[a-zA-Z0-9]{4,10}$/))
    .required()
}).with('userphone', 'userpassword');
