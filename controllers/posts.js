const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id })
      res.render('profile.ejs', { posts: posts, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: 'desc' }).lean()
      res.render('feed.ejs', { posts: posts })
    } catch (err) {
      console.log(err)
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      const posts = await User.find({ _id: post.user })
      const comments = await Comment.find({ post: req.params.id })
        .sort({ createdAt: 'desc' })
        .lean()
      res.render('post.ejs', {
        post: post,
        posts: posts,
        user: req.user,
        comments: comments,
      })
    } catch (err) {
      console.log(err)
    }
  },
  createPost: async (req, res) => {
    try {
      await Post.create({
        event: req.body.event,
        summary: req.body.summary,
        likes: 0,
        user: req.user.id,
      })
      console.log('Post has been added!')
      console.log(req.body)
      res.redirect('/profile')
    } catch (err) {
      console.log(err)
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if (post.usersLiked.includes(req.user._id)) {
        console.log("You've already liked this event!")
        res.redirect(`/post/${req.params.id}`)
      } else {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          }
        )
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: { usersLiked: req.user._id },
          }
        )
        console.log('Likes +1')
        console.log(post)
        res.redirect(`/post/${req.params.id}`)
      }
    } catch (err) {
      console.log(err)
    }
  },
  sharePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { public: true },
        }
      )
      console.log('Post is now public!')
      res.redirect(`/post/${req.params.id}`)
    } catch (err) {
      console.log(err)
    }
  },
  unSharePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { public: false },
        }
      )
      console.log('Post is now private!')
      res.redirect(`/post/${req.params.id}`)
    } catch (err) {
      console.log(err)
    }
  },
  deletePost: async (req, res) => {
    try {
      let post = await Post.findById({ _id: req.params.id })
      await Post.remove({ _id: req.params.id })
      console.log('Deleted Post')
      res.redirect('/profile')
    } catch (err) {
      res.redirect('/profile')
    }
  },
}
