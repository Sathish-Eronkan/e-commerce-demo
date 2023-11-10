import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin@123',10),
        isAdmin: true
    },
    {
        name: 'Sathish',
        email: 'sathish@gmail.com',
        password: bcrypt.hashSync('sathish@123',10),
        isAdmin: false
    },
    {
        name: 'Dinesh',
        email: 'dinesh@gmail.com',
        password: bcrypt.hashSync('dinesh@123',10),
        isAdmin: false
    },
];

export default users;