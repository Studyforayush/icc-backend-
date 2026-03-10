import { useEffect, useState } from 'react';
import { coursesAPI } from '../../services/api';
import { Edit2, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    timing: '',
    category: '',
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await coursesAPI.getAll();
      setCourses(data);
    } catch (err) {
      toast.error('Failed to fetch courses');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await coursesAPI.update(editingId, formData);
        toast.success('Course updated successfully');
      } else {
        await coursesAPI.create(formData);
        toast.success('Course created successfully');
      }
      resetForm();
      fetchCourses();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save course');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await coursesAPI.delete(id);
        toast.success('Course deleted successfully');
        fetchCourses();
      } catch (err) {
        toast.error('Failed to delete course');
      }
    }
  };

  const handleEdit = (course) => {
    setFormData(course);
    setEditingId(course._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', price: '', duration: '', timing: '', category: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 font-heading">Manage Courses</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            {showForm ? 'Cancel' : 'Add Course'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Course Title"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category (e.g., JEE, NEET)"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="Price (₹)"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration (e.g., 6 months)"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <input
                  type="text"
                  name="timing"
                  value={formData.timing}
                  onChange={handleChange}
                  placeholder="Class Timing"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Course Description"
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                {editingId ? 'Update Course' : 'Create Course'}
              </button>
            </form>
          </div>
        )}

        {/* Courses List */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{course.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.category || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">₹{course.price}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
