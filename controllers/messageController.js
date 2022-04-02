import expressAsyncHandler from 'express-async-handler';
import Message from '../models/Message.js';

export const getMessages = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const messages = await Message.find({ receiver_id: id }).populate(
    'sender_id',
    'username'
  );
  res.status(200).json({ success: true, data: messages });
});

export const getAllMessages = expressAsyncHandler(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({ success: true, data: messages });
});

export const getMessage = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { id: userID } = req.user;

  const message = await Message.findOneAndUpdate(
    { _id: id, receiver_id: userID },
    { isRead: true },
    { new: true }
  ).populate('sender_id', 'username');

  res.status(200).json({ success: true, data: message });
});

export const createMessage = expressAsyncHandler(async (req, res, next) => {
  const { subject, content, receiver_id } = req.body;
  const { id } = req.user;

  const message = await Message.create({
    subject,
    content,
    receiver_id,
    sender_id: id,
  });
  res.status(200).json({ success: true, data: message });
});
