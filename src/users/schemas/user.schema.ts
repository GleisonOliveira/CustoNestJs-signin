import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this.password = await bcrypt.hash(this.password, 8);
  } catch (err) {
    next(err);
  }
});
