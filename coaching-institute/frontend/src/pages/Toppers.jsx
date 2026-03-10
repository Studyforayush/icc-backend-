import { useEffect, useState } from 'react';
import { toppersAPI } from '../services/api';
import TopperCard from '../components/common/TopperCard';

export default function Toppers() {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchToppers();
  }, []);

  const fetchToppers = async () => {
    try {
      const { data } = await toppersAPI.getAll();
      setToppers(data);
    } catch (err) {
      console.error('Failed to fetch toppers:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 font-heading mb-4">Our Toppers</h1>
          <p className="text-xl text-gray-600">
            Meet our outstanding students who've achieved remarkable success in competitive exams
          </p>
        </div>

        {/* Toppers Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : toppers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {toppers.map((topper) => (
              <TopperCard key={topper._id} topper={topper} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No toppers to display</p>
          </div>
        )}
      </div>
    </div>
  );
}
