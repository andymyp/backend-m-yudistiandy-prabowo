const db = require('../config/database');
const customer_function = require('../functions/customer');

exports.listProduct = async (req, res) => {
  if (req.user.user_type !== 1) {
    return res.json({
      status: 0,
      message: `Can't access this endpoint! Please use customer account.`,
    });
  }

  const sql_customer = 'SELECT customer_id FROM customer WHERE user_id=?';

  const req_body_customer = [
    req.user.user_id,
  ];

  db.query(sql_customer, req_body_customer, async (err, customer) => {
    if (err) {
      return res.json({
        status: 0,
        message: err.message,
      });
    }

    const sql_product = 'SELECT * FROM product ORDER BY created_at DESC';

    const req_body_product = [
      customer[0].customer_id,
    ];

    db.query(sql_product, req_body_product, (err, result) => {
      if (err) {
        return res.json({
          status: 0,
          message: err.message,
        });
      }

      return res.json({
        status: 1,
        message: 'Success',
        data: result,
      });
    });
  });
};

exports.updateProduct = async (req, res) => {
  if (req.user.user_type !== 0) {
    return res.json({
      status: 0,
      message: `Can't access this endpoint! Please use customer account.`,
    });
  }

  const sql_customer = 'SELECT customer_id FROM customer WHERE user_id=?';

  const req_body_customer = [
    req.user.user_id,
  ];

  db.query(sql_customer, req_body_customer, async (err, customer) => {
    if (err) {
      return res.json({
        status: 0,
        message: err.message,
      });
    }

    const { error } = await customer_function.validateUpdateProduct(req.body);
    if (error) {
      return res.json({
        status: 0,
        message: error.details[0].message,
      });
    }

    const sql_product = 'UPDATE product SET name=?, description=?, price=? WHERE customer_id=? AND product_id=?';

    const req_body_product = [
      req.body.name,
      req.body.description,
      req.body.price,
      customer[0].customer_id,
      req.body.product_id,
    ];

    db.query(sql_product, req_body_product, (err, result) => {
      if (err) {
        return res.json({
          status: 0,
          message: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.json({
          status: 0,
          message: 'Failed! Product not found.',
        });
      }

      return res.json({
        status: 1,
        message: 'Product updated',
      });
    });
  });
};