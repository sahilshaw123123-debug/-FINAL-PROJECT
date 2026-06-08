import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaArrowLeft, FaVideo } from 'react-icons/fa';

const Createliveclass = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    let user = null;
    try { user = userStr ? JSON.parse(userStr) : null; } catch (e) {}
    const [form, setForm] = useState({  
      title:"",
      subject:"",
      instructorName:user?.name || "",
      date:"",
      time:"",
    });
    const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login first");
      return;
    }
    if(user?.role !== "admin" && user?.role !=="instructor"){
      toast.error("Only admin or instructor can create live class");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5500/api/liveclasses",
        form,
        {
          headers: {
            Authorization:`Bearer ${token}`, 
          },
        }
      );

      toast.success("Live class added successfully!");

      setTimeout(() => navigate("/live-classes"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add live class!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-10 px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto">
        <Link
          to="/live-classes"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 font-medium"
        >
          <FaArrowLeft /> Back to Live Classes
        </Link>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 mb-6 shadow-lg text-center">
          <FaVideo className="text-4xl mx-auto mb-3" />
          <h2 className="text-3xl font-bold">Create Live Class</h2>
          <p className="text-sm opacity-90 mt-2">
            Schedule a real-time video classroom
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Class Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Introduction to React"
                onChange={handleChange}
                value={form.title}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="e.g. Web Development"
                onChange={handleChange}
                value={form.subject}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Instructor Name</label>
              <input
                type="text"
                name="instructorName"
                placeholder="Instructor Name"
                onChange={handleChange}
                value={form.instructorName}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                required
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={form.date}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  onChange={handleChange}
                  value={form.time}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  required
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className={`w-full text-white font-medium py-3 rounded-lg transition ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
            >
              {loading ? "Creating Class..." : "Create Live Class"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Createliveclass;
