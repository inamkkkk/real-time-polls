const Poll = require('../models/Poll');

exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    const poll = new Poll({
      question,
      options,
      createdBy: req.user._id
    });
    const savedPoll = await poll.save();
    res.status(201).json(savedPoll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find({});
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.votePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    const { option } = req.body;
    if (!poll.options.includes(option)) {
        return res.status(400).json({ message: 'Invalid option' });
    }

    poll.votes = poll.votes || {};
    poll.votes[option] = (poll.votes[option] || 0) + 1;

    await poll.save();
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
