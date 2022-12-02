const Comment = require('../models/Comment')

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        user: req.user.id,
        userName: req.user.userName,
      })
      console.log('Comment has been added!')
      res.redirect('/post/' + req.params.id)
    } catch (err) {
      console.log(err)
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById({_id: req.params.id})
      // Delete comment from db
      await Comment.remove({_id: req.params.id})
      console.log('Comment has been deleted DUDE!')
      res.redirect('/post/' + comment.post)
    } catch (err) {
      res.redirect('/profile')
      console.log(err)
    }
  },
}
