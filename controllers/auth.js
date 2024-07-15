const bcrypt = require('bcrypt');
const db = require('../config/database');
const auth_function = require('../functions/auth');

exports.register = async (req, res) => {
  const { error } = await auth_function.validateCreate(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  if (req.body.user_type > 1) {
    return res.json({
      status: 0,
      message: '0 for merchant; 1 for customer',
    });
  }

  const db_table = req.body.user_type === 0 ? 'merchant' : 'customer';

  const sql_user = 'INSERT INTO user (email, password, user_type) VALUES (?, ?, ?)';
  const sql_main = `INSERT INTO ${db_table} (user_id, name, address, phone) VALUES (?, ?, ?, ?)`;

  const salt = bcrypt.genSaltSync();
  const password = bcrypt.hashSync(req.body.password, salt);

  const req_body_user = [
    req.body.email,
    password,
    req.body.user_type,
  ];

  db.query(sql_user, req_body_user, (error, result) => {
    if (error) {
      return res.json({
        status: 0,
        message: error.message,
      });
    }

    const req_body_main = [
      result.insertId,
      req.body.name,
      req.body.address,
      req.body.phone,
    ];

    db.query(sql_main, req_body_main, (error) => {
      if (error) {
        return res.json({
          status: 0,
          message: error.message,
        });
      }
    });

    return res.json({
      status: 1,
      message: 'Success',
    });
  });
};
