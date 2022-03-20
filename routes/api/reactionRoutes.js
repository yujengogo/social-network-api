const router = require('express').Router();
const {
  createReaction,
  deleteReaction,
} = require('../../controllers/reactionController');

// /api/Reactions
router.route('/').get(getReactions).post(createReaction);

// /api/Reactions/:ReactionId
router.route('/:reactionId').get(getSingleReaction).delete(deleteReaction).put(editReaction);

// // /api/Reactions/:ReactionId/assignments
// router.route('/:ReactionId/assignments').post(addAssignment);

// // /api/Reactions/:ReactionId/assignments/:assignmentId
// router.route('/:ReactionId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
