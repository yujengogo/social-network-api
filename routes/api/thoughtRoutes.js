const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  editThought,
} = require('../../controllers/thoughtController');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(editThought);

// // /api/Thoughts/:ThoughtId/assignments
// router.route('/:ThoughtId/assignments').post(addAssignment);

// // /api/Thoughts/:ThoughtId/assignments/:assignmentId
// router.route('/:ThoughtId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
