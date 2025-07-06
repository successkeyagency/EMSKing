import connectDB from './db/db.js'
import User from './models/User.js'
import bcrypt from 'bcrypt'


const userRegister = async () => {
    connectDB()
    try {
        const hashPassword = await bcrypt.hash("admin", 10)
        const newUser = new User({
            name: "Admin",
            email: "BossMan@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    } catch(error) {
        console.log(error)
    }
}

userRegister();