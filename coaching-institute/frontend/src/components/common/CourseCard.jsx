import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen, ArrowRight } from 'lucide-react';

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden hover:transform hover:scale-105 duration-300">
      {/* Thumbnail */}
      {course.thumbnail ? (
        <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <BookOpen size={40} className="text-white" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
            {course.category || 'Course'}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

        {/* Info Grid */}
        <div className="space-y-2 mb-6 text-sm text-gray-600">
          {course.duration && (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary-600" />
              <span>{course.duration}</span>
            </div>
          )}
          {course.timing && (
            <div className="flex items-center gap-2">
              <Users size={16} className="text-primary-600" />
              <span>{course.timing}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Users size={16} className="text-primary-600" />
            <span>{course.enrolledCount || 0} students enrolled</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div>
            <span className="text-2xl font-bold text-primary-600">₹{course.price}</span>
            <span className="text-xs text-gray-500 block">/year</span>
          </div>
          <Link
            to={`/courses/${course._id}`}
            className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition group"
          >
            <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
}
