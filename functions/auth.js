const Joi = require('joi');

exports.validateCreate = async (req_body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    user_type: Joi.number().required(),
  });

  return schema.validate(req_body);
};