const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const auth_function = require('../functions/auth');

// ENV
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '@AccessTokenSecretKey2024!';

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

exports.login = async (req, res) => {
  const { error } = await auth_function.validateLogin(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql_user = 'SELECT email, password, user_type, access_token FROM user WHERE email=?';

  const req_body_user = [
    req.body.email,
  ];

  db.query(sql_user, req_body_user, async (error, result) => {
    if (error) {
      return res.json({
        status: 0,
        message: error.message,
      });
    }

    if (result.length === 0) {
      return res.json({
        status: 0,
        message: 'Email not registered!',
      });
    }

    const matchPassword = await bcrypt.compare(req.body.password, result[0].password);

    if (!matchPassword) {
      return res.json({
        status: 0,
        message: 'Password wrong!',
      });
    }

    const accessToken = jwt.sign({ email: req.body.email }, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

    const sql_update = 'UPDATE user SET access_token=? WHERE email=?';

    const req_body_update = [
      accessToken,
      req.body.email,
    ];

    db.query(sql_update, req_body_update, (error) => {
      if (error) {
        return res.json({
          status: 0,
          message: error.message,
        });
      }

      db.query(sql_user, req_body_user, (error, result) => {
        if (error) {
          return res.json({
            status: 0,
            message: error.message,
          });
        }

        return res.json({
          status: 1,
          message: 'Success',
          data: {
            email: result[0].email,
            user_type: result[0].user_type,
            access_token: result[0].access_token,
          },
        });
      });
    });
  });
}