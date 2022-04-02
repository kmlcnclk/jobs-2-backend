import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  subject: {
    type: String,
    required: [true, 'Please enter a subject'],
  },
  content: {
    type: String,
    required: [true, 'Please enter a content'],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  receiver_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please enter a Receiver ID'],
  },
  sender_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please enter a Sender ID'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Message', MessageSchema);
