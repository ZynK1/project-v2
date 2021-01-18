import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Sujan Shrestha',
    email: 'sujan@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Not Admin',
    email: 'notadmin@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
export default users
