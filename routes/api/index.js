const router = require('express').Router();
// const courseRoutes = require('./courseRoutes');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
// router.use('/courses', courseRoutes);
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
