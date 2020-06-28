const auth = require('../middleware/auth');
const User = require('../models/user');
const vars = require('../config/vars');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

module.exports = (app) => {

  // @route     GET api/profile
  // @desc      Get user info
  // @access    Private
  app.get('/api/profile', auth, async (req, res) => {
    try {
      let data = await User.findById(req.user.id)
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  })
  
  // @route     POST api/auth/signup
  // @desc      Regiter a user
  // @access    Public
  app.post('/api/auth/signup',
  [
    check('username', 'Please add name')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({min: 6}),
  ],
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      return res.json({errors: errors.array()});
    } else {
      const {username, password} = req.body;
      
      User.hashPassword(password, async (err, passwordHash) => {
        if (err) return res.json(err)
        let user = await User.findOne({username});
        if (user) return res.status(400).json({msg: 'User already exists'});
        
        user = new User({
          username,
          passwordHash,
        });
        
        try {
          await user.save();
          
          
          const payload = {
            user: {
              id: user.id,
            },
          };
          
          jwt.sign(
            payload,
            vars.jwt_secret,
            {
              expiresIn: 360000,
            },
            (err, token) => {
              console.log(err)
              if (err) throw err;
              res.json({token});
            },
          );
        } catch (saveError) {
          res.json(saveError);
        }

      })
    }
  })
}