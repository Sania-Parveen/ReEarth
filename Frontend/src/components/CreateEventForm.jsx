import React, { useState, useEffect } from "react";

const CreateEventForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    wasteType: "",
    volunteersNeeded: "",
    description: "",
    createdBy: localStorage.getItem("userId") || "",
  });

  useEffect(() => {
    if (initialData._id) {
      setFormData({
        ...initialData,
        volunteersNeeded: initialData.volunteersNeeded?.toString() || "",
        createdBy: initialData.createdBy || localStorage.getItem("userId"),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      volunteersNeeded: Number(formData.volunteersNeeded), // 🔥 Fix is here!
      createdBy: localStorage.getItem("userId"),
    };

    onSubmit(cleanedData);

    // Reset the form
    setFormData({
      title: "",
      location: "",
      date: "",
      time: "",
      wasteType: "",
      volunteersNeeded: "",
      description: "",
      createdBy: localStorage.getItem("userId") || "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 border rounded shadow mb-4 max-w-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          rows={3}
          required // ✅ add this line
        />

        <input
          type="text"
          name="wasteType"
          placeholder="Waste Type"
          value={formData.wasteType}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="volunteersNeeded"
          placeholder="Target Volunteers"
          value={formData.volunteersNeeded}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {initialData._id ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;
