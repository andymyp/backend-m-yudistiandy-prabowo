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

exports.createTransaction = async (req, res) => {
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

    const { error } = await customer_function.validateTransaction(req.body);
    if (error) {
      return res.json({
        status: 0,
        message: error.details[0].message,
      });
    }

    const sql_product = 'SELECT name, price FROM product WHERE product_id=?';

    const req_body_product = [
      req.body.product_id,
    ];

    db.query(sql_product, req_body_product, (err, product) => {
      if (err) {
        return res.json({
          status: 0,
          message: err.message,
        });
      }

      if (product.length === 0) {
        return res.json({
          status: 0,
          message: 'Product not found!',
        });
      }

      let discount = 0;
      let shipping_cost = 10000;

      if (product[0].price > 50000) {
        discount = 10;
      }
      
      if (product[0].price > 15000) {
        shipping_cost = 0;
      }
      
      let discount_amount = product[0].price * (discount / 100);
      let total_price = (product[0].price - discount_amount) + shipping_cost;

      const sql_transaction = 'INSERT INTO transaction (customer_id, product_id, discount, shipping_cost, price, total_price) VALUES (?, ?, ?, ?, ?, ?)';

      const req_body_transaction = [
        customer[0].customer_id,
        req.body.product_id,
        discount,
        shipping_cost,
        product[0].price,
        total_price,
      ];

      db.query(sql_transaction, req_body_transaction, (err) => {
        if (err) {
          return res.json({
            status: 0,
            message: err.message,
          });
        }

        return res.json({
          status: 1,
          message: 'Transaction created',
        });
      });
    });
  });
};