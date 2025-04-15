const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const auth = require('../middleware/auth');

// GET all quotes
router.get('/', async (req, res) => {
  const quotes = await Quote.find().sort({ createdAt: -1 });
  res.json(quotes);
});

// POST (admin only)
router.post('/', auth, async (req, res) => {
  const { text, author, category } = req.body;
  const quote = new Quote({ text, author, category });
  await quote.save();
  res.status(201).json(quote);
});

// DELETE quote
router.delete('/:id', auth, async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.json({ message: 'Quote deleted' });
});

module.exports = router;
