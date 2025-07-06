import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { motion } from "framer-motion";
import { DepartmentButtons } from "../../utils/DepartmentHelper";
import { useAuth } from "../../context/authContext";

const MotionLink = motion(Link);

const DepartmentV = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const isDemoUser =
    user?.email === "BossMan@gmail.com" ||
    user?.email === "testerapp2232@gmail.com";

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get("https://emsking-backend-server.vercel.app/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        const data = response.data.departments.map((dep, index) => ({
          _id: dep._id,
          sno: index + 1,
          dep_name: dep.dep_name,
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredDepartments(departments);
      return;
    }

    const filtered = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredDepartments(filtered);
  };

  const columns = [
    {
      name: "S No",
      selector: (row) => row.sno,
      width: "70px",
    },
    {
      name: "Department Name",
      selector: (row) => row.dep_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <DepartmentButtons
          Id={row._id}
          onDepartmentDelete={onDepartmentDelete}
          // isDemoUser={isDemoUser}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "160px",
    },
  ];

  return (
    <div className="lg:pl-64 min-h-screen bg-gray-50 py-6 px-4">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="text-xl sm:text-3xl font-semibold text-center mb-6 text-blue-700">
          Manage Departments
        </h3>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-5">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by Department Name"
            className="w-full sm:w-1/3 px-4 py-2 text-sm border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <MotionLink
            to="/admin-dashboard/add-department"
            className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-md shadow-md transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Department
          </MotionLink>
        </div>

        {/* Desktop Table - visible md and up */}
        <div className="hidden md:block bg-white border rounded-xl shadow-lg p-4 max-w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              progressPending={depLoading}
              highlightOnHover
              responsive={false}
              noHeader
              striped
              dense
              customStyles={{
                headRow: {
                  style: {
                    backgroundColor: "#f3f4f6",
                    fontWeight: "bold",
                  },
                },
                rows: {
                  style: {
                    minHeight: "56px",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4 mt-4">
          {filteredDepartments.map((dep) => (
            <div
              key={dep._id}
              className="bg-white shadow-md rounded-lg p-4 border border-blue-200"
            >
              <div className="text-sm text-gray-500 font-medium mb-1">
                Department
              </div>
              <div className="text-base font-semibold text-blue-700 mb-2">
                {dep.dep_name}
              </div>
              <div className="flex justify-end">
                <DepartmentButtons
                  Id={dep._id}
                  onDepartmentDelete={onDepartmentDelete}
                  // isDemoUser={isDemoUser}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DepartmentV;
