const {Reaction} = require('../models');

// Aggregate function to get the number of reactions overall
// const headCount = async () =>
//   Reaction.aggregate()
//     .count('reactionCount')
//     .then((numberOfReactions) => numberOfReactions);

// // Aggregate function for getting the overall grade using $avg
// const grade = async (reactionId) =>
//   Reaction.aggregate([
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: { _id: reactionId, overallGrade: { $avg: '$assignments.score' } },
//     },
//   ]);

module.exports = {

  // create a new reaction
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction
  deleteReaction(req, res) {
    Reaction.findOneAndRemove({ _id: req.params.reactionId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No such reaction exists' })
          : res.json({ message: 'Reaction successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //   editReaction(req, res) {
  //   Reaction.findOneAndUpdate(
  //     { _id: req.params.reactionId},
  //     req.body,
  //     {new: true},
  //     )
  //     .then((reaction) =>
  //       !reaction
  //         ? res.status(404).json({ message: 'No reaction is updated' })
  //         : res.json({ message: 'Reaction successfully updated' })
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },

//   // Add an assignment to a reaction
  // addAssignment(req, res) {
//     console.log('You are adding an assignment');
//     console.log(req.body);
  //   Reaction.findOneAndUpdate(
  //     { _id: req.params.reactionId },
  //     { $addToSet: { assignments: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((reaction) =>
  //       !reaction
  //         ? res
  //             .status(404)
  //             .json({ message: 'No reaction found with that ID :(' })
  //         : res.json(reaction)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
//   // Remove assignment from a reaction
//   removeAssignment(req, res) {
//     Reaction.findOneAndUpdate(
//       { _id: req.params.reactionId },
//       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
//       { runValidators: true, new: true }
//     )
//       .then((reaction) =>
//         !reaction
//           ? res
//               .status(404)
//               .json({ message: 'No reaction found with that ID :(' })
//           : res.json(reaction)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
};
