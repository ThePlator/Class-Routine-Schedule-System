const express = require('express');
const router = express.Router();
const { getTeachers, getTeacherById, addTeacher, updateTeacher, deleteTeacher } = require('../controllers/teacherController');

router.get('/', getTeachers);
router.get('/:id', getTeacherById);
router.post('/', addTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

module.exports = router;