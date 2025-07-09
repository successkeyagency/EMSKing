import express from 'express'
import cors from 'cors'
import connectDB from './db/db.js'

// Import routes
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

// ✅ Proper CORS setup
app.use(cors({
  origin: [
    "http://localhost:5173",               
    "https://emsking.vercel.app"          
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Optionally, add manual CORS headers too (edge cases)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // or specify specific domain
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Body parser
app.use(express.json())

// Static file serving (for profile images if local)
app.use(express.static('public/uploads'))

// Routes
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/dashboard', dashboardRouter)

// Health check
app.get('/', (req, res) => res.send('API is running'));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}`)
})
