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

const PORT = process.env.PORT;

connectData();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "https://emp-management-frontend-tau.vercel.app", // Your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions))

app.use("/api/auth", authRouter);
app.use("/api/department", departementRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", adminDashboardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.get("/", async (req, res) => {
  res.json("Server is running");
});
