import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { getAuthData } from "../utils/authStorage";

function MaitenanceForm({ locationId, deviceId, projectId, locationData }) {
  const [date, setDate] = useState("");
  const [maintenanceType, setMaintenanceType] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [createdBy, setCreatedBy] = useState("");
  const [showCardOfMaintenanceData, setshowCardOfMaintenanceData] =
    useState(false);
  const [activeView, setActiveView] = useState(null);

  useEffect(() => {
    const auth = getAuthData();
    if (auth?.user?.username) {
      setCreatedBy(auth.user.username);
    }
  }, []);

  useEffect(() => {
    axios
      .get("/get-job-list")
      .then((res) => {
        setAllTasks(res.data);
        setAvailableTasks(res.data);
      })
      .catch((err) => {
        console.error(
          "🔥 Failed to fetch tasks:",
          err.response?.data || err.message
        );
      });
  }, []);

  useEffect(() => {
    let filtered = [];

    if (maintenanceType === "special") {
      filtered = allTasks.filter((task) => {
        const taskFor = task.task_for.toLowerCase();

        const isSchedule = taskFor === "schedule maintenance";
        const hasDevice = ["transformer"].some((device) =>
          taskFor.includes(device)
        );
        const isEmergency = taskFor === "emergency";

        return isSchedule || hasDevice || isEmergency;
      });
    } else if (maintenanceType === "scheduled") {
      filtered = allTasks.filter((task) => {
        const taskFor = task.task_for.toLowerCase();

        const isSchedule = taskFor === "schedule maintenance";
        const hasDevice = ["transformer"].some((device) =>
          taskFor.includes(device)
        );

        return isSchedule || hasDevice;
      });
    } else if (maintenanceType === "emergency") {
      filtered = allTasks.filter(
        (task) => task.task_for.toLowerCase() === "emergency"
      );
    }

    setFilteredTasks(filtered);
    setAvailableTasks(filtered);
    setSelectedTasks([]);
  }, [maintenanceType, allTasks]);

  const handleSelectTask = (task) => {
    setSelectedTasks((prev) => [...prev, task]);
    setAvailableTasks((prev) => prev.filter((t) => t.task_id !== task.task_id));
  };
  const handleUnselectTask = (task) => {
    setAvailableTasks((prev) => [...prev, task]);
    setSelectedTasks((prev) => prev.filter((t) => t.task_id !== task.task_id));
  };

  const handleTaskChange = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      date,
      locationId,
      deviceId,
      maintenanceType,
      selectedTasks,
    };

    console.log("📝 Form Submitted:", payload);
  };

  if (!locationId)
    return (
      <div>
        <div className="p-6 border border-[#b7cfdc] rounded-xl shadow-lg bg-[#d9e4ec] space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
            <h2 className="text-2xl font-bold text-[#385e72] mb-4 sm:mb-0">
              Maintenance Record
            </h2>
            <br /><br />
          </div>
          <p className="text-[#385e72] text-center font-semibold">
            Please enter a valid Location ID to proceed with submitting the
            maintenance record.
          </p>
        </div>
      </div>
    );

  return (
    <div className="border border-[#b7cfdc] rounded-xl shadow-md overflow-hidden transition-all duration-500 ease-in-out">
      <div
        onClick={() => setshowCardOfMaintenanceData(!showCardOfMaintenanceData)}
        className="cursor-pointer bg-[#385e72] text-white px-6 py-3 flex justify-between items-center text-lg font-semibold"
      >
        <span>Maintenance Record</span>
        <span>{showCardOfMaintenanceData ? "▲" : "▼"}</span>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          showCardOfMaintenanceData
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 h-0"
        } origin-top transform`}
      >
        {showCardOfMaintenanceData && (
          <div className="p-6 bg-[#d9e4ec] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setActiveView("form")}
                  className={`w-full sm:w-auto px-4 py-2 ${
                    activeView === "form" ? "bg-[#385e72]" : "bg-[#385e72]"
                  } text-white rounded-lg shadow  hover:bg-[#1f3947]`}
                >
                  Add Record
                </button>
                <button
                  onClick={() => setActiveView("table")}
                  className={`w-full sm:w-auto px-4 py-2 ${
                    activeView === "table" ? "bg-[#385e72]" : "bg-[#b7cfdc]"
                  } text-white rounded-lg shadow hover:bg-[#1f3947]`}
                >
                  View Latest Records
                </button>
              </div>
            </div>

            {activeView === "form" && (
              <form onSubmit={handleSubmit} className="w-full mx-auto mt-6">
                <label className="block font-bold mb-2 text-[#385e72]">
                  Maintenance Form
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <div className="border p-4 rounded-xl shadow bg-white">
                    <label className="text-sm font-medium text-[#385e72] mb-1">
                      Device ID
                    </label>
                    <input
                      type="text"
                      value={deviceId?.id}
                      className={`w-full py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6aabd2] 
        border-[#b7cfdc]`}
                    />
                  </div>

                  <div className="border p-4 rounded-xl shadow bg-white">
                    <label className="text-sm font-medium text-[#385e72] mb-1">
                      Location ID
                    </label>
                    <input
                      type="text"
                      value={locationId}
                      className={`w-full py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6aabd2] 
        border-[#b7cfdc]`}
                      readOnly
                    />
                  </div>

                  <div className="border p-4 rounded-xl shadow bg-white">
                    <label className="text-sm font-medium text-[#385e72] mb-1">
                      Project ID
                    </label>
                    <input
                      type="text"
                      value={projectId || ""}
                      className={`w-full py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6aabd2] 
        border-[#b7cfdc]`}
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <div className="border p-4 rounded-xl shadow bg-white">
                    <label className="block text-sm font-medium text-[#385e72] mb-1">
                      Created By
                    </label>
                    <input
                      type="text"
                      name="createdBy"
                      placeholder="Enter creator's name"
                      value={createdBy}
                      onChange={(e) => setCreatedBy(e.target.value)}
                      className="w-full py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6aabd2] border-[#b7cfdc]"
                    />
                  </div>

                  <div className="border p-4 rounded-xl shadow bg-white">
                    <label className="block text-sm font-medium text-[#385e72] mb-1">
                      Expected Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      className="w-full py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6aabd2] border-[#b7cfdc]"
                    />
                  </div>

                  <div className="border p-4 rounded-xl shadow bg-white">
                    <label
                      htmlFor="date"
                      className="text-sm font-medium text-[#385e72] mb-1"
                    >
                      Created On
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6aabd2] border-[#b7cfdc]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <div className="border p-4 rounded-xl shadow bg-white">
                    <label className="text-sm font-medium text-[#385e72] mb-1">
                      Maintenance Type
                    </label>
                    <select
                      value={maintenanceType}
                      onChange={(e) => setMaintenanceType(e.target.value)}
                      className={`w-full py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6aabd2] 
            border-[#b7cfdc]`}
                    >
                      <option value="">Select Maintenance Type</option>
                      <option value="emergency">🔥 Emergency</option>
                      <option value="scheduled">📅 Scheduled</option>
                      <option value="special">✨ Special</option>
                    </select>
                  </div>
                </div>

                {maintenanceType && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                    <div className="border p-4 rounded-xl shadow bg-white h-72 overflow-y-auto">
                      <h3 className="text-sm font-medium text-[#385e72] mb-2 p-3 border-b sticky top-[-17px] bg-white z-10">
                        Available Tasks
                      </h3>
                      <div className="px-2">
                        {availableTasks.map((task) => (
                          <label
                            key={task.task_id}
                            className="flex items-center gap-2 cursor-pointer hover:bg-[#6aabd2] p-2 rounded transition"
                            onClick={() => handleSelectTask(task)}
                          >
                            <input type="checkbox" readOnly />
                            {task.task_name}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="border p-4 rounded-xl shadow bg-white h-72 overflow-y-auto">
                      <h3 className="text-sm font-medium text-[#385e72] mb-2 p-3 border-b sticky top-[-17px] bg-white z-10">
                        Selected Tasks
                      </h3>
                      <div className="px-2">
                        {selectedTasks.map((task) => (
                          <label
                            key={task.task_id}
                            className="flex items-center gap-2 cursor-pointer hover:bg-[#6aabd2] p-2 rounded transition"
                            onClick={() => handleUnselectTask(task)}
                          >
                            <input
                              type="checkbox"
                              className="accent-[#6aabd2]"
                              checked
                              readOnly
                            />
                            {task.task_name}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#385e72] text-white font-semibold rounded-lg shadow-md hover:bg-[#6aabd2]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}

            {activeView === "table" && (
              <div className="text-center text-gray-500 italic">
                <div className="overflow-x-auto">
                  <table className="min-w-full border mt-4">
                    <thead className="bg-[#d9e4ec]">
                      <tr>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Technician</th>
                        <th className="px-4 py-2 border">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border">2025-04-08</td>
                        <td className="px-4 py-2 border">Yash</td>
                        <td className="px-4 py-2 border">
                          Replaced fuse, tested circuit.
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">2025-04-01</td>
                        <td className="px-4 py-2 border">Ravi</td>
                        <td className="px-4 py-2 border">
                          Routine inspection, no issues.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>{" "}
                Latest Maintenance Records will show here...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MaitenanceForm;
