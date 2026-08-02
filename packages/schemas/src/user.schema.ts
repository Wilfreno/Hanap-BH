import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Suffix, UserRole, UserStatus } from '@repo/enums/user.enums'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ collection: 'user' })
export class User {
  @Prop({ type: String, required: true })
  first_name!: string

  @Prop({ type: String, required: false })
  middle_name!: string

  @Prop({ type: String, required: true })
  last_name!: string

  @Prop({ type: String, enum: Object.values(Suffix), required: false })
  suffix!: string

  @Prop({ type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  email!: string

  @Prop({ type: String, required: false })
  password?: string

  @Prop({ type: String, enum: Object.values(UserStatus), required: false })
  status!: UserStatus

  @Prop({ type: String, enum: Object.values(UserRole), required: true })
  role!: UserRole

  @Prop({ type: Date, required: false, default: Date.now })
  last_online!: Date

  @Prop({ type: Date, required: false, default: Date.now })
  date_created!: Date

  @Prop({ type: Date, required: false, default: Date.now })
  last_updated!: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
