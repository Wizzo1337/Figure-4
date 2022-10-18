const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const medicationsController = require("../controllers/medications");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Med Routes - simplified for now
router.get("/:id", ensureAuth, medicationsController.getMedView);

router.post("/createMed", upload.single("file"), medicationsController.createMed);

// router.put("/likePost/:id", postsController.likePost);

// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
