import React, { useState, useEffect } from "react";

function MaitenanceForm({ locationId, deviceId, projectId }) {
  const [date, setDate] = useState("");
  const [maintenanceType, setMaintenanceType] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [createdBy, setCreatedBy] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username) {
      setCreatedBy(user.username); 
    }
  }, []);

 useEffect(() => {
   const token = localStorage.getItem("token");

   fetch(`${import.meta.env.VITE_API_BASE_URL}/get-job-list`, {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   })
     .then((res) => {
       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
       return res.json();
     })
     .then((data) => {
       setAllTasks(data);
       setAvailableTasks(data);
     })
     .catch((err) => {
       console.error("🔥 Failed to fetch tasks:", err);
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

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto mt-6 bg-white">
      <h2 className="text-2xl font-bold text-[#6c63ff] text-center mb-6">
        Maintenance Form
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Device ID
          </label>
          <input
            type="text"
            value={deviceId}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
            readOnly
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Location ID
          </label>
          <input
            type="text"
            value={locationId}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
            readOnly
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Project ID
          </label>
          <input
            type="text"
            value={projectId || ""}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
            readOnly
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Created By
          </label>
          <input
            type="text"
            name="createdBy"
            placeholder="Enter creator's name"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col">
          <label
            htmlFor="date"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Created On
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Maintenance Type
          </label>
          <select
            value={maintenanceType}
            onChange={(e) => setMaintenanceType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
          >
            <option value="">Select Maintenance Type</option>
            <option value="emergency">🔥 Emergency</option>
            <option value="scheduled">📅 Scheduled Maintenance</option>
            <option value="special">✨ Special</option>
          </select>
        </div>
      </div>

      {maintenanceType && (
        <>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="border border-gray-300 rounded-l h-72 overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-700 mb-2 p-3 border-b sticky top-0 bg-white z-10">
                Available Tasks
              </h3>
              <div className="px-2">
                {availableTasks.map((task) => (
                  <label
                    key={task.task_id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
                    onClick={() => handleSelectTask(task)}
                  >
                    <input type="checkbox" readOnly />
                    {task.task_name}
                  </label>
                ))}
              </div>
            </div>

            <div className="border border-gray-300 rounded-l h-72 overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-700 mb-2 p-3 border-b sticky top-0 bg-white z-10">
                Selected Tasks
              </h3>
              <div className="px-2">
                {selectedTasks.map((task) => (
                  <label
                    key={task.task_id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
                    onClick={() => handleUnselectTask(task)}
                  >
                    <input type="checkbox" checked readOnly />
                    {task.task_name}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-[#6c63ff] text-white font-semibold rounded-lg shadow-md hover:bg-[#5951e6]"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default MaitenanceForm;
