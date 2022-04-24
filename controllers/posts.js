const Post = require("../model/postModel");
const handleError = require("../service/handleError");

const posts = {
  async getPosts(req, res) {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      data: posts,
    });
  },
  async createdPost(req, res) {
    try {
      const data = req.body;
      const newPost = await Post.create({
        name: data.name,
        content: data.content,
      });
      res.status(200).json({
        status: "success",
        data: newPost,
      });
    } catch (error) {
      handleError(res, error);
    }
  },
  async updatedPost(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const newPost = await Post.findByIdAndUpdate(
        id,
        {
          name: data.name,
          content: data.content,
        },
        { new: true }
      );
      res.status(200).json({
        status: "success",
        data: newPost,
      });
    } catch (err) {
      handleError(res, err);
    }
  },
  async deletedPost(req, res) {
    try {
      const id = req.params.id;
      const delPost = await Post.findByIdAndDelete(id);
      res.status(200).json({
        status: "success",
        data: delPost,
      });
    } catch (err) {
      handleError(res, err);
    }
  },
  async clearPosts(req, res) {
    await Post.deleteMany({});
    res.status(200).json({
      status: "success",
      data: [],
    });
  },
};

module.exports = posts;
