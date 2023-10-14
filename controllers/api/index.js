const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/dashboard', projectRoutes);

module.exports = router;
