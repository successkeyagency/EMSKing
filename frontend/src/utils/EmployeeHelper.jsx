import axios from "axios";
import { useNavigate } from "react-router-dom";

// Table column definitions
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

// Fetch departments for dropdowns
export const fetchDepartments = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      return response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return [];
};

// Fetch employees by department ID
export const getEmployees = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.data.success) {
      return response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return [];
};

// Action buttons for each employee row
export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  const btnBase =
    "px-2.5 py-1 text-xs rounded-md text-white font-medium transition hover:opacity-90";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`${btnBase} bg-teal-600`}
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>
      <button
        className={`${btnBase} bg-blue-600`}
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className={`${btnBase} bg-yellow-500`}
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </button>
      <button
        className={`${btnBase} bg-red-600`}
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};
