import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  sender: mongoose.Schema.Types.ObjectId; // Reference to User ID
  channel: mongoose.Schema.Types.ObjectId; // Reference to ChatChannel ID
  timestamp: Date;
}

const messageSchema: Schema<IMessage> = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'ChatChannel',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message;
