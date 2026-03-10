import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold font-heading mb-4">Excellence Academy</h3>
            <p className="text-gray-400">
              Premier coaching institute for JEE, NEET, Board Exams, and Olympiad preparations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/courses" className="hover:text-white transition">Courses</a></li>
              <li><a href="/toppers" className="hover:text-white transition">Toppers</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+919876543210" className="hover:text-white transition">+91-9876543210</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:info@excellenceacademy.com" className="hover:text-white transition">info@excellenceacademy.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>123 Education Street, Delhi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8 flex justify-center gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <Instagram size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 mt-8 border-t border-gray-800 pt-8">
          <p>&copy; 2026 Excellence Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
