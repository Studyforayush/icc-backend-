import { useEffect, useState } from 'react';
import { feedbackAPI } from '../../services/api';
import { Check, X, Eye, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data } = await feedbackAPI.getAllAdmin();
      setFeedback(data);
    } catch (err) {
      toast.error('Failed to fetch feedback');
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    try {
      await feedbackAPI.approve(id);
      toast.success('Feedback approved and published');
      fetchFeedback();
    } catch (err) {
      toast.error('Failed to approve feedback');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await feedbackAPI.delete(id);
        toast.success('Feedback deleted successfully');
        fetchFeedback();
      } catch (err) {
        toast.error('Failed to delete feedback');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 font-heading">Manage Feedback</h1>
          <p className="text-gray-600 mt-2">Review and manage student feedback submissions</p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading feedback...</div>
        ) : feedback.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Comment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-800">{item.name}</div>
                        {item.student && (
                          <div className="text-xs text-gray-500">{item.student.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {renderStars(item.rating)}
                          <span className="ml-2 text-sm text-gray-600">({item.rating}/5)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-800 max-w-xs truncate">
                          {item.comment}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.isApproved
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {item.isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {!item.isApproved && (
                            <button
                              onClick={() => handleApprove(item._id)}
                              className="p-1 text-green-600 hover:text-green-800 transition"
                              title="Approve feedback"
                            >
                              <Check size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedFeedback(item)}
                            className="p-1 text-blue-600 hover:text-blue-800 transition"
                            title="View full feedback"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-1 text-red-600 hover:text-red-800 transition"
                            title="Delete feedback"
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
            <p className="text-gray-600 text-lg">No feedback submissions yet</p>
          </div>
        )}

        {/* Feedback Detail Modal */}
        {selectedFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-800">Feedback Details</h2>
                  <button
                    onClick={() => setSelectedFeedback(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                    <p className="text-gray-800">{selectedFeedback.name}</p>
                  </div>
                  {selectedFeedback.student && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-800">{selectedFeedback.student.email}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex items-center gap-1">
                      {renderStars(selectedFeedback.rating)}
                      <span className="ml-2">({selectedFeedback.rating}/5)</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedFeedback.isApproved
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {selectedFeedback.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                  <p className="text-gray-800 bg-gray-50 p-4 rounded-lg leading-relaxed">
                    "{selectedFeedback.comment}"
                  </p>
                </div>

                {selectedFeedback.course && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Related Course</label>
                    <p className="text-gray-800">{selectedFeedback.course.title}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Submitted On</label>
                  <p className="text-gray-600">{formatDate(selectedFeedback.createdAt)}</p>
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                {!selectedFeedback.isApproved && (
                  <button
                    onClick={() => {
                      handleApprove(selectedFeedback._id);
                      setSelectedFeedback(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Approve & Publish
                  </button>
                )}
                <button
                  onClick={() => {
                    handleDelete(selectedFeedback._id);
                    setSelectedFeedback(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
