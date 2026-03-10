import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import { ArrowLeft, Clock, Users, BookOpen } from 'lucide-react';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const { data } = await coursesAPI.getById(id);
      setCourse(data);
    } catch (err) {
      console.error('Failed to fetch course:', err);
      navigate('/courses');
    }
    setLoading(false);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!course) return <div className="text-center py-12">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back to Courses
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} className="w-full h-96 object-cover" />
          ) : (
            <div className="w-full h-96 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <BookOpen size={60} className="text-white" />
            </div>
          )}

          <div className="p-8">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 font-semibold rounded-full">
                {course.category || 'Course'}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 font-heading mb-4">{course.title}</h1>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {course.duration && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Clock size={24} className="text-primary-600 mb-2" />
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-lg font-semibold text-gray-800">{course.duration}</p>
                </div>
              )}
              {course.timing && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Users size={24} className="text-primary-600 mb-2" />
                  <p className="text-sm text-gray-600">Class Timing</p>
                  <p className="text-lg font-semibold text-gray-800">{course.timing}</p>
                </div>
              )}
              <div className="bg-gray-50 p-4 rounded-lg">
                <BookOpen size={24} className="text-primary-600 mb-2" />
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-lg font-semibold text-gray-800">₹{course.price}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Course</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{course.description}</p>
            </div>

            {/* Syllabus */}
            {course.syllabus && course.syllabus.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Syllabus</h2>
                <div className="space-y-4">
                  {course.syllabus.map((item, i) => (
                    <div key={i} className="border-l-4 border-primary-600 pl-4 py-2">
                      <h3 className="text-lg font-semibold text-gray-800">{item.topic}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enroll Button */}
            <button className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
