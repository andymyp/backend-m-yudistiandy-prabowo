const jwt = require('jsonwebtoken');
const db = require('../config/database');

// ENV
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '@AccessTokenSecretKey2024!';

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    if (!token || token === 'null' || token === 'undefined' || token === '') {
      return res.json({
        statusCode: 0,
        message: 'Not Authorized!',
      })
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        return res.json({
          statusCode: 0,
          message: 'Not Authorized!',
        })
      }

      const sql_user = 'SELECT user_id, email, user_type FROM user WHERE email=? AND access_token=?';

      const req_body_user = [
        data.email,
        token
      ];

      db.query(sql_user, req_body_user, (error, result) => {
        if (error) {
          return res.json({
            status: 0,
            message: error.message,
          });
        }

        if (result.length === 0) {
          req.user = {};
          return res.json({
            statusCode: 0,
            message: 'Not Authorized!',
          })
        }

        req.user = result[0];
        return next();
      });
    });
  } else {
    return res.json({
      statusCode: 0,
      message: 'Not Authorized!',
    })
  }
}

module.exports = authentication;