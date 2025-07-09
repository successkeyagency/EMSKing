import express from 'express'
import cors from 'cors'
import connectDB from './db/db.js'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/Salary.js'
import leaveRouter from './routes/leave.js' 
import settingRouter from './routes/settings.js'
import attendanceRouter from './routes/attendance.js'
import dashboardRouter from './routes/dashboard.js'





connectDB();

const app = express() 

app.use(cors());


// app.use(cors({
//   origin: ["https://emsking.vercel.app"], 
//   credentials: true
// }));

app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/dashboard', dashboardRouter)

app.get('/', (req, res) => res.send('API is running'));


app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`)
})
