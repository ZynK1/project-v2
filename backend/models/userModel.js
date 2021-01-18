import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

//hashing password for registration - auto during registration
userSchema.pre('save', async function (next) {
  // checking password if its changed or not during updating data so it doesn't change
  if (!this.isModified('password')) {
    next()
  }

  //salt to hash the password asynchronously
  const salt = await bcrypt.genSalt(10) //await bcoz it generates promise
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
export default User
