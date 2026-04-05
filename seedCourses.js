const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config();

const sampleCourses = [
  {
    title: 'Full Stack React + Node.js',
    description: 'Build complete web applications using React on the frontend and Node.js/Express on the backend. Covers hooks, REST APIs, and MongoDB.',
    category: 'Web Dev',
    price: 499,
    instructor: 'Arjun Sharma',
  },
  {
    title: 'UI/UX Fundamentals with Figma',
    description: 'Learn the core principles of UI/UX design. Build real-world wireframes and prototypes using Figma from scratch.',
    category: 'Design',
    price: 299,
    instructor: 'Priya Mehta',
  },
  {
    title: 'DSA Masterclass',
    description: 'Master Data Structures and Algorithms. Covers arrays, linked lists, trees, graphs, dynamic programming, and competitive programming patterns.',
    category: 'DSA',
    price: 399,
    instructor: 'Rahul Gupta',
  },
  {
    title: 'Python for AI & Machine Learning',
    description: 'Introduction to Python programming with a focus on AI/ML. Covers NumPy, Pandas, Scikit-learn, and building your first ML models.',
    category: 'AI / ML',
    price: 599,
    instructor: 'Dr. Sneha Iyer',
  },
  {
    title: 'Placement Prep 2025',
    description: 'Everything you need to crack campus placements — aptitude, coding rounds, HR interviews, resume building, and mock interviews.',
    category: 'Placement',
    price: 199,
    instructor: 'Vikram Nair',
  },
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Existing courses cleared');

    // Insert sample courses
    const inserted = await Course.insertMany(sampleCourses);
    console.log(`${inserted.length} courses inserted:`);
    inserted.forEach((c) => console.log(`  - ${c.title}`));

  } catch (error) {
    console.error('Seed error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    process.exit(0);
  }
};

seedCourses();