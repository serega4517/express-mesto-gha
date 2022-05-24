const router = require('express').Router();

const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', auth, getUsers);
router.get('/users/:userId', auth, getUserById);
router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, updateUserInfo);
router.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = router;
