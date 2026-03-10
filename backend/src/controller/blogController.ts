import type { Request, Response } from "express";
import { prisma } from "../../db";
import { postBlogSchema } from "../utils/type";


export const getBlogs = async (req:Request, res:Response) =>{
    let id = req.params.id as string || undefined;
    let blogs = await prisma.blog.findMany(
        {
            where:{
                id: id
            }
        }
    );

    res.status(200).json({
        message: "blogs",
        blogs: blogs
    })
}


export const postBlog = async (req:Request, res:Response) =>{

    const {success, data, error} = postBlogSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: error.message });
    }

    let blog = await prisma.blog.create({
        data:{
            ...data,
            author: req.id
        }
    })

    res.status(200).json({
        message: "blogs",
        blog: blog
    })
}