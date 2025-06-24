const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

module.exports = router;
