const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// Route: /api/users
router.route("/").get(getUsers).post(createUser);

// Route: /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Route: /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
