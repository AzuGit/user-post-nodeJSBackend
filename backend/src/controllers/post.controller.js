import Post from "../models/post.model";

const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    //Basic validation
    if (!name || !description || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Create new post
    const newPost = await Post.create({
      name,
      description,
      age,
    });

    return res.status(201).json({
      message: "Post created successfully",
      Post: newPost,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const readAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error reading posts:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  try {
    //check if body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }
    const { id } = req.params;
    //check if post exists and update
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    //if post not found
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {}
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    //check if post exists
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    //delete post
    await Post.findByIdAndDelete(id);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);

    return res.status(500).json({ message: "Server error" });
  }
};

export { createPost, deletePost, readAllPosts, updatePost };
