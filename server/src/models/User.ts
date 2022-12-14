import { Schema, model, Types } from 'mongoose'

interface UserType {
  email: string
  password: string
  diskSpace?: number
  usedSpace?: number
  avatar?: string
  file?: Types.ObjectId
}

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  file: [{ type: Schema.Types.ObjectId, ref: 'File' }],
})

export default model('User', User)
