const { Thought, User } = require('../models');

// Aggregate function to get the number of thoughts overall
// const headCount = async () =>
//   Thought.aggregate()
//     .count('thoughtCount')
//     .then((numberOfThoughts) => numberOfThoughts);

// // Aggregate function for getting the overall grade using $avg
// const grade = async (thoughtId) =>
//   Thought.aggregate([
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: { _id: thoughtId, overallGrade: { $avg: '$assignments.score' } },
//     },
//   ]);

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
            thought,
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    })
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        )
          .then((user) =>
            !user
              ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json({ err }));
      })
  },
  // Delete a thought and remove them from the course
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>{
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $pull: { thoughts: thought._id } },
          { new: true }
        )
          .then((user) =>
            !user
              ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json({ err }));

        })
  },

  editThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body,
      { new: true },
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought is updated' })
          : res.json({ message: 'Thought successfully updated' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //   // Add an assignment to a thought
  //   addAssignment(req, res) {
  //     console.log('You are adding an assignment');
  //     console.log(req.body);
  //     Thought.findOneAndUpdate(
  //       { _id: req.params.thoughtId },
  //       { $addToSet: { assignments: req.body } },
  //       { runValidators: true, new: true }
  //     )
  //       .then((thought) =>
  //         !thought
  //           ? res
  //               .status(404)
  //               .json({ message: 'No thought found with that ID :(' })
  //           : res.json(thought)
  //       )
  //       .catch((err) => res.status(500).json(err));
  //   },
  //   // Remove assignment from a thought
  //   removeAssignment(req, res) {
  //     Thought.findOneAndUpdate(
  //       { _id: req.params.thoughtId },
  //       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //       { runValidators: true, new: true }
  //     )
  //       .then((thought) =>
  //         !thought
  //           ? res
  //               .status(404)
  //               .json({ message: 'No thought found with that ID :(' })
  //           : res.json(thought)
  //       )
  //       .catch((err) => res.status(500).json(err));
  //   },
};
