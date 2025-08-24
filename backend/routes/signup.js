const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {  // Should be '/', not '/api/signup'
  try {
    const { username, password } = req.body;

    if (await User.findOne({ username })) {
      return res.status(400).json({ success: false, message: 'User exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    await new User({ username, password: hash }).save();

    res.json({ success: true, message: 'User created' });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during signup',
      error: error.message
    });
  }
});

module.exports = router;
