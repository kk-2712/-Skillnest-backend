const Course = require('../models/Course');
const User = require('../models/User');

// @route  POST /api/courses
// @access Private + Admin only
const createCourse = async (req, res) => {
  const { title, description, category, price, instructor } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const course = await Course.create({
      title,
      description,
      category,
      price,
      instructor,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/courses
// @access Public
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  POST /api/courses/:id/enroll
// @access Private (logged-in users)
const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const alreadyEnrolled = course.studentsEnrolled.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.studentsEnrolled.push(req.user._id);
    await course.save();

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { enrolledCourses: course._id },
    });

    res.json({
      message: 'Enrolled successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE COURSE
// @route  PUT /api/courses/:id
// @access Private + Admin
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.category = req.body.category || course.category;
    course.price = req.body.price ?? course.price;
    course.instructor = req.body.instructor || course.instructor;

    const updated = await course.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE COURSE
// @route  DELETE /api/courses/:id
// @access Private + Admin
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.deleteOne();

    res.json({ message: 'Course removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ EXPORTS AT VERY END (IMPORTANT)
module.exports = {
  createCourse,
  getAllCourses,
  enrollInCourse,
  updateCourse,
  deleteCourse,
};