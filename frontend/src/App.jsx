import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminD from "./views/AdminD.jsx";
import Signin from "./views/Signin.jsx";
import EmployeeD from "./views/EmployeeD.jsx";
import PrivateR from "./utils/PrivateR.jsx";
import RoleR from "./utils/RoleR.jsx";
import AdminS from "./components/dashboard/AdminS.jsx";
import DepartmentV from "./components/department/DepartmentV.jsx";
import DepartmentAdd from "./components/department/DepartmentAdd.jsx";
import DepartmentEdit from "./components/department/DepartmentEdit.jsx";
import List from "./components/employee/List.jsx";
import Add from "./components/employee/Add.jsx";
import View from "./components/employee/View.jsx";
import Edit from "./components/employee/Edit.jsx";
import ViewSal from "./components/salary/View.jsx";
import Addsal from "./components/salary/Add.jsx";
import TList from "./components/Leave/TList.jsx";
import TAdd from "./components/Leave/TAdd.jsx";
import TTable from "./components/Leave/TTable.jsx";
import TDetail from "./components/Leave/TDetail.jsx";
import Settings from "./components/EmployeeDashboard/Settings.jsx";
import AttendanceReport from "./components/Attendance/AttendanceReport.jsx";
import Attendance from "./components/Attendance/Attendance.jsx";
import ESummary from "./components/EmployeeDashboard/ESummary.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/admin-dashboard"} />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateR>
              <RoleR requiredRole={["admin"]}>
                <AdminD />
              </RoleR>
            </PrivateR>
          }>
            <Route index element={<AdminS/>}></Route>
            <Route path="departments" element={<DepartmentV />} />
            <Route path="/admin-dashboard/add-department" element={<DepartmentAdd />} />
            <Route path="/admin-dashboard/departments/edit/:id" element={<DepartmentEdit/>} />
            <Route path="/admin-dashboard/employees" element={<List/>} />
            <Route path="/admin-dashboard/add-employee" element={<Add/>} />
            <Route path="/admin-dashboard/employees/:id" element={<View/>} />
            <Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>} />
            <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSal/>} />
            <Route path="/admin-dashboard/salary/add" element={<Addsal/>}>

            
            </Route>

            <Route path="/admin-dashboard/setting" element={<Settings />}></Route>
            <Route path="/admin-dashboard/attendance" element={<Attendance />}></Route>
          <Route path="/admin-dashboard/attendance-report" element={<AttendanceReport />}></Route>


          <Route path="/admin-dashboard/leaves" element={<TTable />}></Route>
          <Route path="/admin-dashboard/leaves/:id" element={<TDetail />}></Route>
          <Route path="/admin-dashboard/employees/leaves/:id" element={<TList />}></Route>

        </Route>
        

        <Route path="/employee-dashboard" 
        element={
        <PrivateR>
          <RoleR requiredRole={["admin", "employee"]}>
            <EmployeeD />
          </RoleR>
        </PrivateR>
        }
        >
          <Route index element={<ESummary />}></Route> 

          <Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
          <Route path="/employee-dashboard/leaves/:id" element={<TList />}></Route>
          <Route path="/employee-dashboard/add-leave" element={<TAdd />}></Route>
          <Route path="/employee-dashboard/salary/:id" element={<ViewSal />}></Route>
          <Route path="/employee-dashboard/setting" element={<Settings />}></Route>



        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
