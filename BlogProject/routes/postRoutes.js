const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const postController = require("../controllers/postController");

router.post("/", auth, postController.createPost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);

module.exports = router;