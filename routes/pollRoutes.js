const express = require('express');
const router = express.Router();
const { createPoll, getPolls, getPoll, votePoll } = require('../controllers/pollController');

router.post('/', createPoll);
router.get('/', getPolls);
router.get('/:id', getPoll);
router.put('/:id/vote', votePoll);

module.exports = router;
