import express from "express";
import "dotenv/config";
import cors from "cors";

import authRouter from "./routes/authRoutes.js";
import departementRouter from "./routes/departmentRoutes.js";
import employeeRouter from "./routes/employeeRoutes.js";
import salaryRouter from "./routes/salaryRoutes.js";
import leaveRouter from "./routes/LeaveRoutes.js";
import settingRouter from "./routes/settingRoutes.js";
import adminDashboardRouter from "./routes/adminDashboardRoutes.js";
import { connectData } from "./db/database.js";

const PORT = process.env.PORT || 5000;

connectData();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  process.env.CLIENT_WEB_URL,
  process.env.CLIENT_LOCALHOST_URL,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/auth", authRouter);
app.use("/api/department", departementRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", adminDashboardRouter);

app.get("/", (req, res) => {
  res.json("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
