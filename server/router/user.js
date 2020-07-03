const auth = require('../middleware/auth');
const User = require('../models/user');
const vars = require('../config/vars');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const _ = require('lodash');

module.exports = (app) => {
  // @route     GET api/profile
  // @desc      Get user info
  // @access    Private
  app.get('/api/profile', auth, async (req, res) => {
    try {
      const data = await User.findById(req.user.id)
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  })

  // @route     GET api/users/:username/books/:bookid
  // @desc      Get personal information about book
  // @access    Private
  app.get('/api/users/:username/fin_books/:book_id', auth, async (req, res) => {
    try {
      const data = await User.findById(req.user.id)
      
      if (data) {
        const book = _.find(data.finishedBooks, { bookId: req.params.book_id });
        
        if (book) {
          return res.json(book);
        }
      }
      res.json(null);
    } catch (err) {
      res.json(err);
    }
  })

  // @route     POST api/users/:username/books/:bookid
  // @desc      Add book to finished books of user
  // @access    Private
  app.post('/api/users/:username/fin_books/:book_id', auth, async (req, res) => {
    try {
      let data = await User.findById(req.user.id)
      
      if (data) {
        data.finishedBooks.push({ bookId: req.params.book_id });
        
        await data.save();
        return res.json(data);
      }
      res.json(null);
    } catch (err) {
      res.json(err);
    }
  })

  // @route     DELETE api/users/:username/books/:bookid
  // @desc      Delete book from finished books of user
  // @access    Private
  app.put('/api/users/:username/fin_books/:book_id', auth, async (req, res) => {
    try {
      let data = await User.findById(req.user.id)
      
      if (data) {
        let newBooks = data.finishedBooks;
        _.remove(newBooks, { bookId: req.params.book_id });
        
        data.finishedBooks = newBooks;
        // console.log(data);
        let res = await User.findOneAndUpdate(data);
        console.log(res);
        return res.json(data);
      }
      res.json(null);
    } catch (err) {
      res.json(err);
    }
  })

  // @route     POST api/auth/signin
  // @desc      Sign in user
  // @access    Public
  app.post(
    '/api/auth/signin',
    [
      check('username', 'Please add name')
      .not()
      .isEmpty(),
      check('password', 'Please enter a password',)
      .not()
      .isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const {username, password} = req.body;

      try {
        let user = await User.findOne({username});

        if (!user) {
          return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
          return res.status(400).json({msg: 'Invalid Credentials'});
        }

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
            if (err) throw err;
            res.json({token});
          },
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    },
  );

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
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      return res.json({errors: errors.array()});
    } else {
      const {username, password, bio} = req.body;
      
      User.hashPassword(password, async (err, passwordHash) => {
        if (err) return res.json(err)
        let user = await User.findOne({username});
        if (user) return res.status(400).json({msg: 'User already exists'});
        
        user = new User({
          username,
          passwordHash,
          bio
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