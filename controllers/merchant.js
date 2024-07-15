const db = require('../config/database');
const merchant_function = require('../functions/merchant');

exports.createProduct = async (req, res) => {
  if (req.user.user_type !== 0) {
    return res.json({
      status: 0,
      message: `Can't access this endpoint! Please use merchant account.`,
    });
  }

  const sql_merchant = 'SELECT merchant_id FROM merchant WHERE user_id=?';

  const req_body_merchant = [
    req.user.user_id,
  ];

  db.query(sql_merchant, req_body_merchant, async (err, merchant) => {
    if (err) {
      return res.json({
        status: 0,
        message: err.message,
      });
    }

    const { error } = await merchant_function.validateCreateProduct(req.body);
    if (error) {
      return res.json({
        status: 0,
        message: error.details[0].message,
      });
    }

    const sql_product = 'INSERT INTO product (merchant_id, name, description, price) VALUES (?, ?, ?, ?)';

    const req_body_product = [
      merchant[0].merchant_id,
      req.body.name,
      req.body.description,
      req.body.price,
    ];

    db.query(sql_product, req_body_product, (err) => {
      if (err) {
        return res.json({
          status: 0,
          message: err.message,
        });
      }

      return res.json({
        status: 1,
        message: 'Success',
      });
    });
  });
};

exports.listProduct = async (req, res) => {
  if (req.user.user_type !== 0) {
    return res.json({
      status: 0,
      message: `Can't access this endpoint! Please use merchant account.`,
    });
  }

  const sql_merchant = 'SELECT merchant_id FROM merchant WHERE user_id=?';

  const req_body_merchant = [
    req.user.user_id,
  ];

  db.query(sql_merchant, req_body_merchant, async (err, merchant) => {
    if (err) {
      return res.json({
        status: 0,
        message: err.message,
      });
    }

    const sql_product = 'SELECT * FROM product WHERE merchant_id=?';

    const req_body_product = [
      merchant[0].merchant_id,
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