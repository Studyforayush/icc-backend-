require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const User = mongoose.model('User', {
      name: String,
      email: String,
      password: String,
      role: String,
      enrolledCourses: Array,
    }, 'users');

    const adminExists = await User.findOne({ email: 'admin@excellenceacademy.com' });
    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 12);

    const admin = new User({
      name: 'Admin',
      email: 'admin@excellenceacademy.com',
      password: hashedPassword,
      role: 'admin',
      enrolledCourses: []
    });

    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@excellenceacademy.com');
    console.log('🔑 Password: admin123');
    console.log('🎯 Role: admin');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();