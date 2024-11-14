import "dotenv/config";

// Role
export const Role = {
  admin: "admin",
  employee: "employee",
};

// Leave Type
export const Annual = "Annual leave";
export const Sick = "Sick Leave";
export const Casual = "Casual Leave";

// Leave Status
export const Pending = "Pending";
export const Approved = "Approved";
export const Rejected = "Rejected";

// EndPoints
const adminApi = "/auth";
const employeeApi = "/employee";
const leaveApi = "/leave";
const departmentApi = "/department";
const salaryApi = "/salary";
const settingApi = "/setting";
const dashboardApi = "/dashboard";

// BASE_PREFIX=/dev/api
// APP_VERSION=/v1
// /dev/api/v1/auth

// API Endpoints
const BASEPREFIX = process.env.BASE_PREFIX;
const APPVERSION = process.env.APP_VERSION;
console.log(BASEPREFIX + APPVERSION)

// endpoint = /dev/api/v1/auth
export const admin = BASEPREFIX + APPVERSION + adminApi;
export const employee = BASEPREFIX + APPVERSION + employeeApi;
export const department = BASEPREFIX + APPVERSION + departmentApi;
export const leave = BASEPREFIX + APPVERSION + leaveApi;
export const salary = BASEPREFIX + APPVERSION + salaryApi;
export const setting = BASEPREFIX + APPVERSION + settingApi;
export const dashboard = BASEPREFIX + APPVERSION + dashboardApi;
