var express = require("express");
var router = express.Router();
const Post = require("../model/postModel");
const errHandle = require("../errHandle");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    data: posts,
  });
});
router.post("/", async function (req, res, next) {
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
    errHandle(res, error);
  }
});
router.patch("/:id", async function (req, res, next) {
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
    errHandle(res, err);
  }
});
router.delete("/", async function (req, res, next) {
  await Post.deleteMany({});
  res.status(200).json({
    status: "success",
    data: [],
  });
});
router.delete("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const delPost = await Post.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: delPost,
    });
  } catch (err) {
    errHandle(res, err);
  }
});

module.exports = router;
