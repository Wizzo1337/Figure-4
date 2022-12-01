const cloudinary = require("../middleware/cloudinary");
const Medication = require("../models/Medication");
const Comment = require("../models/Comment");

module.exports = {
  getMed: async (req, res) => {
    try {
      const meds = await Medication.find({ user: req.user.id });
      res.render("medication.ejs", { user: req.user, meds: meds });
    } catch (err) {
      console.log(err);
    }
  },
  getMedView: async (req, res) => {
    try {
      const meds = await Medication.findById(req.params.id);
      console.log(meds)
      const comments = await Comment.find({meds: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("medication-view.ejs", { user: req.user, meds: meds, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createMed: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Medication.create({
        medication: req.body.medName,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        instruction: req.body.instruction,
        likes: 0,
        user: req.user.id,
      });
      console.log("Med has been added!");
      console.log(req.body)
      res.redirect("/medication");
    } catch (err) {
      console.log(err);
    }
  },
  deleteMed: async (req, res) => {
    try {
      await Medication.remove({ _id: req.params.id });
      console.log("Med has been deleted!");
      res.redirect("/medication");
    } catch (err) {
      res.redirect("/profile");
      console.log("Error deleting med");
    }
  }

  // deletePost: async (req, res) => {
  //   try {
  //     // Find post by id
  //     let post = await Post.findById({ _id: req.params.id });
  //     // Delete image from cloudinary
  //     // await cloudinary.uploader.destroy(post.cloudinaryId);
  //     // Delete post from db
  //     await Post.remove({ _id: req.params.id });
  //     console.log("Deleted Post");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     res.redirect("/profile");
  //   }
  // },
};
