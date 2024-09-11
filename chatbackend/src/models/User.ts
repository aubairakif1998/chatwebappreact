import mongoose, { Schema, Document, CallbackError } from 'mongoose';
import argon2 from 'argon2';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// Pre-save hook to hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (err) {
    // Cast the error to Error type
    next(err as CallbackError);
  }
});

// Check if the model already exists
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
