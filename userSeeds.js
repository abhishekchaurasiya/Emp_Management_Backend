import bcrypt from 'bcrypt'
import { connectData } from './db/database.js';
import User from './models/User.js';

const userRegister = async () => {
    connectData();
    try {
    
        const hashPassword = await bcrypt.hash('admin', 10);
        const newUser = new User({
            name: 'Abhishek',
            email: 'admin@gmail.com',
            password: hashPassword,
            role: 'admin',
        })
        await newUser.save();
    } catch (error) {
        console.log(error.message)
    }
}

userRegister();