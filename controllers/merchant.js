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

    const sql_product = 'SELECT * FROM product WHERE merchant_id=? ORDER BY created_at DESC';

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

exports.updateProduct = async (req, res) => {
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

    const { error } = await merchant_function.validateUpdateProduct(req.body);
    if (error) {
      return res.json({
        status: 0,
        message: error.details[0].message,
      });
    }

    const sql_product = 'UPDATE product SET name=?, description=?, price=? WHERE merchant_id=? AND product_id=?';

    const req_body_product = [
      req.body.name,
      req.body.description,
      req.body.price,
      merchant[0].merchant_id,
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

exports.deleteProduct = async (req, res) => {
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

    const { error } = await merchant_function.validateDeleteProduct(req.body);
    if (error) {
      return res.json({
        status: 0,
        message: error.details[0].message,
      });
    }

    const sql_product = 'DELETE FROM product WHERE merchant_id=? AND product_id=?';

    const req_body_product = [
      merchant[0].merchant_id,
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
        message: 'Product deleted',
      });
    });
  });
};

exports.listCustomer = async (req, res) => {
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

    const rows = 't.transaction_id, t.created_at as transaction_time, c.customer_id, c.name as customer_name, p.product_id, p.name as product_name, t.total_price';
    const tables = 'product p, transaction t, customer c';
    const conditions = 'p.merchant_id=? AND p.product_id=t.product_id AND t.customer_id=c.customer_id';
    const order_by = 't.created_at DESC'

    const sql = `SELECT ${rows} FROM ${tables} WHERE ${conditions} ORDER BY ${order_by}`;

    const req_body = [
      merchant[0].merchant_id,
    ];

    db.query(sql, req_body, (err, result) => {
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