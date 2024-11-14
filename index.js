import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes//authRoutes.js";
import departementRouter from "./routes/departmentRoutes.js";
import employeeRouter from "./routes/employeeRoutes.js";
import salaryRouter from "./routes/salaryRoutes.js";
import leaveRouter from "./routes/LeaveRoutes.js";
import settingRouter from "./routes/settingRoutes.js";
import adminDashboardRouter from "./routes/adminDashboardRoutes.js";
import { connectData } from "./db/database.js";
import { admin, dashboard, department, employee, leave, salary, setting } from "./utils/commonUtils.js";

const PORT = process.env.PORT;

connectData();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// /dev/api/v1/auth
app.use(admin, authRouter);
app.use(department, departementRouter);
app.use(employee, employeeRouter);
app.use(salary, salaryRouter);
app.use(leave, leaveRouter);
app.use(setting, settingRouter);
app.use(dashboard, adminDashboardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.get("/", async (req, res) => {
  res.json("Server is running");
});
