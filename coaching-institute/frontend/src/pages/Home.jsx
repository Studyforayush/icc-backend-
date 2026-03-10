import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { coursesAPI } from '../services/api';
import CourseCard from '../components/common/CourseCard';
import { ArrowRight, BookOpen, Users, Trophy } from 'lucide-react';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await coursesAPI.getAll();
      setCourses(data.slice(0, 3));
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-4">
            Excellence Academy
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Prepare for JEE, NEET, Board Exams & Olympiads with Expert Coaching
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Explore Courses
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
            <p className="text-gray-600 text-lg">Students Enrolled</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
            <p className="text-gray-600 text-lg">Toppers Produced</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
            <p className="text-gray-600 text-lg">Years of Excellence</p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 font-heading mb-4">
              Our Popular Courses
            </h2>
            <p className="text-gray-600 text-lg">
              Choose from our comprehensive range of coaching programs
            </p>
          </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              View All Courses
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 font-heading text-center mb-12">
            Why Choose Excellence Academy?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen size={40} />,
                title: 'Expert Faculty',
                desc: 'Highly experienced teachers with proven track records',
              },
              {
                icon: <Users size={40} />,
                title: 'Small Batch Size',
                desc: 'Personalized attention to every student',
              },
              {
                icon: <Trophy size={40} />,
                title: 'Proven Results',
                desc: '95% success rate in competitive exams',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition">
                <div className="text-primary-600 mx-auto w-16 h-16 flex items-center justify-center bg-primary-100 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-heading mb-4">Ready to Ace Your Exams?</h2>
          <p className="text-xl mb-8 text-primary-100">Join Excellence Academy today and unlock your potential</p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
