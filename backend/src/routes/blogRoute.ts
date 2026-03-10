import { Router } from "express";
import { register, login } from "../controller/authController";
import { auth } from "../utils/auth";
import { getBlogs, postBlog } from "../controller/blogController";

const router = Router();

router.use(auth);

router.get("/blogs/:id", getBlogs);
router.get("/blogs", getBlogs);


router.post("/blogs", postBlog);

export default router;