const axios = require('axios');

const createAdmin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Admin',
      email: 'admin@excellenceacademy.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@excellenceacademy.com');
    console.log('🔑 Password: admin123');
    console.log('🎯 Role: admin');
    console.log('🔑 Token:', response.data.token);

  } catch (err) {
    if (err.response?.status === 400 && err.response?.data?.message === 'Email already registered') {
      console.log('ℹ️  Admin user already exists!');
      console.log('📧 Email: admin@excellenceacademy.com');
      console.log('🔑 Password: admin123');
    } else {
      console.error('❌ Error creating admin:', err.response?.data || err.message);
    }
  }
};

createAdmin();