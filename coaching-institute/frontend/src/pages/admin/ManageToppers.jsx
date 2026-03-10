import { useEffect, useState } from 'react';
import { toppersAPI } from '../../services/api';
import { Edit2, Trash2, Plus, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageToppers() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    marks: '',
    rank: '',
    exam: '',
    year: '',
    achievement: '',
    course: '',
  });

  useEffect(() => {
    fetchToppers();
  }, []);

  const fetchToppers = async () => {
    try {
      const { data } = await toppersAPI.getAll();
      setToppers(data);
    } catch (err) {
      toast.error('Failed to fetch toppers');
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
        await toppersAPI.update(editingId, formData);
        toast.success('Topper updated successfully');
      } else {
        await toppersAPI.create(formData);
        toast.success('Topper created successfully');
      }
      resetForm();
      fetchToppers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save topper');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this topper?')) {
      try {
        await toppersAPI.delete(id);
        toast.success('Topper deleted successfully');
        fetchToppers();
      } catch (err) {
        toast.error('Failed to delete topper');
      }
    }
  };

  const handleEdit = (topper) => {
    setFormData(topper);
    setEditingId(topper._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      photo: '',
      marks: '',
      rank: '',
      exam: '',
      year: '',
      achievement: '',
      course: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 font-heading">Manage Toppers</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition"
          >
            <Plus size={20} />
            {showForm ? 'Cancel' : 'Add Topper'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Student Name"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none"
                />
                <input
                  type="text"
                  name="exam"
                  value={formData.exam}
                  onChange={handleChange}
                  required
                  placeholder="Exam (e.g., JEE Advanced, NEET)"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none"
                />
                <input
                  type="text"
                  name="rank"
                  value={formData.rank}
                  onChange={handleChange}
                  placeholder="Rank (e.g., AIR 12)"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none"
                />
                <input
                  type="text"
                  name="marks"
                  value={formData.marks}
                  onChange={handleChange}
                  placeholder="Marks (e.g., 99.8%)"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none"
                />
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Year (e.g., 2024)"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none"
                />
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="Course ID (optional)"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none"
                />
                <input
                  type="url"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  placeholder="Photo URL (optional)"
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none"
                />
              </div>
              <textarea
                name="achievement"
                value={formData.achievement}
                onChange={handleChange}
                placeholder="Achievement description (optional)"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-600 outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition font-semibold"
              >
                {editingId ? 'Update Topper' : 'Create Topper'}
              </button>
            </form>
          </div>
        )}

        {/* Toppers List */}
        {loading ? (
          <div className="text-center py-12">Loading toppers...</div>
        ) : toppers.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Exam</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Marks</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Year</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {toppers.map((topper) => (
                    <tr key={topper._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {topper.photo ? (
                            <img
                              src={topper.photo}
                              alt={topper.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                              <Trophy size={16} className="text-yellow-600" />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-800">{topper.name}</div>
                            {topper.achievement && (
                              <div className="text-xs text-gray-500 truncate max-w-xs">
                                {topper.achievement}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{topper.exam}</td>
                      <td className="px-6 py-4 text-sm text-red-600 font-semibold">{topper.rank || '-'}</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-semibold">{topper.marks || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{topper.year || '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(topper)}
                            className="text-yellow-600 hover:text-yellow-800 transition"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(topper._id)}
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
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No toppers added yet</p>
            <p className="text-gray-500 text-sm mt-2">Add your first topper to showcase student achievements</p>
          </div>
        )}
      </div>
    </div>
  );
}
