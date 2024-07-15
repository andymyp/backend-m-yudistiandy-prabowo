const Joi = require('joi');

exports.validateUpdateProduct = async (req_body) => {
  const schema = Joi.object({
    product_id: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  });

  return schema.validate(req_body);
};

exports.validateDeleteProduct = async (req_body) => {
  const schema = Joi.object({
    product_id: Joi.number().required(),
  });

  return schema.validate(req_body);
};