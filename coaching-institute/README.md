# Coaching Institute Website

A comprehensive full-stack coaching institute management system with student enrollment, course management, AI chatbot, and admin dashboard.

## 🏗️ Project Structure

```
coaching-institute/
├── frontend/          ← React.js with Tailwind CSS
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Global state (Auth)
│   │   ├── services/       # API calls
│   │   └── App.jsx         # Main app file
│   └── package.json
└── backend/           ← Node.js with Express & MongoDB
    ├── config/        # Database configuration
    ├── controllers/   # Business logic
    ├── middleware/    # Auth & protection
    ├── models/        # MongoDB schemas
    ├── routes/        # API routes
    ├── .env           # Environment variables
    └── server.js      # Express app entry
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm
- MongoDB Atlas account
- OpenAI API key

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set environment variables (already in .env)
# Edit .env file with your credentials if needed

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# App runs on http://localhost:3000
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Toppers
- `GET /api/toppers` - Get all toppers
- `POST /api/toppers` - Create topper (admin only)
- `PUT /api/toppers/:id` - Update topper (admin only)
- `DELETE /api/toppers/:id` - Delete topper (admin only)

### Feedback
- `GET /api/feedback` - Get approved feedback
- `POST /api/feedback` - Submit feedback
- `PUT /api/feedback/:id/approve` - Approve feedback (admin only)

### Messages
- `POST /api/messages` - Send contact message
- `GET /api/messages` - Get all messages (admin only)
- `PUT /api/messages/:id/reply` - Reply to message (admin only)

### AI Chat
- `POST /api/chat` - Send message to AI chatbot

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Auto-injected in API requests via axios interceptor
- Admin routes are protected and require admin role
- Tokens expire after 30 days

## 👨‍💼 Admin Features

### Admin Dashboard (`/admin`)
- View statistics
- Quick access to management panels

### Manage Courses (`/admin/courses`)
- Add/Edit/Delete courses
- Set pricing, duration, timing
- Manage syllabus

(Additional admin pages can be created following the same pattern)

## 🤖 AI Chatbot

The chatbot widget appears in the bottom-right corner and:
- Answers questions about courses, fees, timing
- Uses OpenAI GPT-3.5-turbo
- Maintains conversation history
- Available on all pages

## 🎨 Customization

### Colors & Styling
Edit `tailwind.config.js` to change:
- Primary color (currently indigo)
- Secondary color (currently amber)
- Font families
- Other Tailwind defaults

### Branding
Update these files:
- `Navbar.jsx` - Site name and logo
- `Footer.jsx` - Contact info and links
- `chatRoutes.js` - Chatbot system prompt

## 📦 Deployment

### Deploy Backend on Render

1. Push code to GitHub
2. Go to render.com → New Web Service
3. Connect GitHub repo
4. Set environment variables:
   - MONGO_URI
   - JWT_SECRET
   - OPENAI_API_KEY
   - CLIENT_URL (your frontend URL)
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. Deploy

Backend lives at: `https://your-app.onrender.com`

### Deploy Frontend on Vercel

1. Push code to GitHub
2. Go to vercel.com → Import Project
3. Select GitHub repo
4. Add Environment Variable:
   - REACT_APP_API_URL = https://your-backend.onrender.com/api
5. Deploy

Frontend lives at: `https://your-app.vercel.app`

### MongoDB Atlas Setup

1. Go to mongodb.com/atlas
2. Create free cluster (AWS, Mumbai region)
3. Create database user with username & password
4. Add network access (0.0.0.0/0 for production setup)
5. Get connection string
6. Use as MONGO_URI with your credentials

## 📊 Database Schema

### User
- name, email, password (hashed)
- role (student/admin)
- enrolledCourses (array of course IDs)

### Course
- title, description, price
- duration, timing, category
- syllabus (array of topics)
- thumbnail, isActive

### Topper
- name, photo, marks, rank
- exam, year
- achievement, course reference

### Feedback
- name, rating (1-5), comment
- student, course references
- isApproved, photo

### Message
- name, email, phone
- subject, message
- isRead, reply

## 🛠️ Development Tips

### Adding a New Page
1. Create component in `frontend/src/pages/`
2. Add route in `App.jsx`
3. Update navigation in `Navbar.jsx`

### Adding an API Endpoint
1. Create route in `backend/routes/`
2. Add controller logic in `backend/controllers/`
3. Use service method in frontend `services/api.js`
4. Call in React component

### Adding Admin Features
1. Create page in `frontend/src/pages/admin/`
2. Wrap with `<AdminRoute>` in routing
3. Use API methods with admin permissions

## 📝 License

This project is part of the Excellence Academy coaching institute management system.

## 🆘 Support

For issues or questions:
- Email: info@excellenceacademy.com
- Phone: +91-9876543210

---

**Happy Coding! 🚀**
