const router = require("express").Router();
const usersController = require("../controllers/usersController");
const auth = require("../middleware/auth");
const db = require("../models");

// Matching with "/register"
router.route("/register")
    .post(usersController.register)

// Matching with "/login"
router.route("/login")
    .post(usersController.login)

// Matching with "/delete"
router.route("/delete")
    .delete(usersController.remove);

// Matching with "/tokenIsValid"
router.route("/tokenIsValid")
    .post(usersController.tokenIsValid);

// Matches with "/"
// router.route("/")
//     .get(usersController.index)


router.get("/", auth, async (req, res) => {
  const user = await db.User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

module.exports = router;