const Message = require('../models/messageModel');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).populate('user', 'name');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const postMessage = async (req, res) => {
  const { user, content, room } = req.body;
  try {
    const message = new Message({ user, content, room });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

module.exports = { getMessages, postMessage };
