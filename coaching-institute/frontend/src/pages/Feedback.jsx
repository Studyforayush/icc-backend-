import { useEffect, useState } from 'react';
import { feedbackAPI } from '../services/api';
import FeedbackForm from '../components/common/FeedbackForm';
import { Star } from 'lucide-react';

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data } = await feedbackAPI.getAll();
      setFeedbackList(data);
    } catch (err) {
      console.error('Failed to fetch feedback:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-1">
            <FeedbackForm onSuccess={() => fetchFeedback()} />
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 font-heading mb-8">
              Student Reviews
            </h2>

            {loading ? (
              <div>Loading...</div>
            ) : feedbackList.length > 0 ? (
              <div className="space-y-6">
                {feedbackList.map((feedback) => (
                  <div
                    key={feedback._id}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
                  >
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${
                            i < feedback.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {feedback.name}
                    </h3>

                    {/* Comment */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      "{feedback.comment}"
                    </p>

                    {/* Meta */}
                    <div className="text-sm text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600">No reviews yet. Be the first to share!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
