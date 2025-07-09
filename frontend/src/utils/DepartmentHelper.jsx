import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ Id, onDepartmentDelete, isDemoUser }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    // if (isDemoUser) {
    //   alert("🚫 This is a demo account. Deleting departments is disabled.");
    //   return;
    // }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?",
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          // `http://localhost:4000/api/department/${id}`,
          `https://emsking-backend-server.vercel.app/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data.success) {
          onDepartmentDelete();
        }
      } catch (error) {
        alert(error.response?.data?.error || "Failed to delete department.");
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/departments/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
        onClick={() => handleDelete(Id)}
      >
        Delete
      </button>
    </div>
  );
};
