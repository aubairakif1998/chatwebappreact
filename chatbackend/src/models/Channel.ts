import mongoose, { Schema, Document } from 'mongoose';

export interface IChannel extends Document {
  name: string;
  users: mongoose.Schema.Types.ObjectId[];  
}

const ChannelSchema: Schema<IChannel> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
});

const Channel = mongoose.model<IChannel>('Channel', ChannelSchema);
export default Channel;
