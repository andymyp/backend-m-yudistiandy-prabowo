const Joi = require('joi');

exports.validateTransaction = async (req_body) => {
  const schema = Joi.object({
    product_id: Joi.number().required(),
  });

  return schema.validate(req_body);
};