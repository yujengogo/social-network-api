const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  editUser,
} = require('../../controllers/userController');

// /api/Users
router.route('/').get(getUsers).post(createUser);

// /api/Users/:UserId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(editUser);

// // /api/Users/:UserId/assignments
// router.route('/:UserId/assignments').post(addAssignment);

// // /api/Users/:UserId/assignments/:assignmentId
// router.route('/:UserId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
