const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the thoughts
  const thoughts = [];

  // Get some random assignment objects using a helper function that we imported from ./data
  const assignments = getRandomAssignments(20);

  // Loop 20 times -- add thoughts to the thoughts array
  for (let i = 0; i < 20; i++) {
    const username = getRandomName();


    thoughts.push({
      thoughtText,
      createdAt,
      username,
      reactions,
    });
  }

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Add courses to the collection and await the results
  await User.collection.insertOne({
    username: 'Mike',
    email: 'mike@mike.com',
    thoughts: [...thoughts],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.table(assignments);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
