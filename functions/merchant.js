const Joi = require('joi');

exports.validateCreateProduct = async (req_body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  });

  return schema.validate(req_body);
};

exports.validateLogin = async (req_body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(req_body);
};