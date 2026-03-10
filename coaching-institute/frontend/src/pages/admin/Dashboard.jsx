import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { coursesAPI, feedbackAPI, messagesAPI, toppersAPI } from '../../services/api';
import { BarChart3, FileText, MessageSquare, BookOpen, Trophy } from 'lucide-react';

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    courses: 0,
    feedback: 0,
    messages: 0,
    toppers: 0,
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    } else {
      fetchStats();
    }
  }, [isAdmin, navigate]);

  const fetchStats = async () => {
    try {
      const [coursesRes, feedbackRes, messagesRes, toppersRes] = await Promise.all([
        coursesAPI.getAll(),
        feedbackAPI.getAllAdmin(),
        messagesAPI.getAll(),
        toppersAPI.getAll(),
      ]);

      setStats({
        courses: coursesRes.data.length,
        feedback: feedbackRes.data.length,
        messages: messagesRes.data.length,
        toppers: toppersRes.data.length,
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const adminLinks = [
    {
      icon: <BookOpen size={32} />,
      title: 'Manage Courses',
      count: stats.courses,
      link: '/admin/courses',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: <FileText size={32} />,
      title: 'Manage Feedback',
      count: stats.feedback,
      link: '/admin/feedback',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: <MessageSquare size={32} />,
      title: 'View Messages',
      count: stats.messages,
      link: '/admin/messages',
      color: 'from-purple-400 to-purple-600',
    },
    {
      icon: <Trophy size={32} />,
      title: 'Manage Toppers',
      count: stats.toppers,
      link: '/admin/toppers',
      color: 'from-yellow-400 to-yellow-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 font-heading mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your coaching institute</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {adminLinks.map((item, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${item.color} text-white rounded-lg shadow-lg p-8 cursor-pointer hover:shadow-2xl transition transform hover:scale-105`}
              onClick={() => navigate(item.link)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white/20 p-4 rounded-lg">{item.icon}</div>
                <div className="text-4xl font-bold opacity-20">{item.count}</div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
              <p className="text-white/80">Total: {item.count}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/admin/courses')}
              className="p-4 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
            >
              + Add New Course
            </button>
            <button
              onClick={() => navigate('/admin/feedback')}
              className="p-4 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition font-semibold"
            >
              Review Feedback
            </button>
            <button
              onClick={() => navigate('/admin/messages')}
              className="p-4 border-2 border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition font-semibold"
            >
              Check Messages
            </button>
            <button
              onClick={() => navigate('/admin/toppers')}
              className="p-4 border-2 border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50 transition font-semibold"
            >
              Manage Toppers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
