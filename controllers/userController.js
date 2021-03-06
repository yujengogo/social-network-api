const { User} = require('../models');

// Aggregate function to get the number of users overall
// const headCount = async () =>
//   User.aggregate()
//     .count('userCount')
//     .then((numberOfUsers) => numberOfUsers);

// // Aggregate function for getting the overall grade using $avg
// const grade = async (userId) =>
//   User.aggregate([
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: { _id: userId, overallGrade: { $avg: '$assignments.score' } },
//     },
//   ]);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    editUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId},
      req.body,
      {new: true},
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user is updated' })
          : res.json({ message: 'User successfully updated' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

//   // Add an assignment to a user
  // addAssignment(req, res) {
//     console.log('You are adding an assignment');
//     console.log(req.body);
  //   User.findOneAndUpdate(
  //     { _id: req.params.userId },
  //     { $addToSet: { assignments: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((user) =>
  //       !user
  //         ? res
  //             .status(404)
  //             .json({ message: 'No user found with that ID :(' })
  //         : res.json(user)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
//   // Remove assignment from a user
//   removeAssignment(req, res) {
//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
//       { runValidators: true, new: true }
//     )
//       .then((user) =>
//         !user
//           ? res
//               .status(404)
//               .json({ message: 'No user found with that ID :(' })
//           : res.json(user)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
};
