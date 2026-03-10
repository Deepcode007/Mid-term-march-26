import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";
import ENV from "../utils/config";
import { loginSchema, registerSchema } from "../utils/type";
import { token } from "../utils/token";

export const register = async (req: Request, res: Response) => {
    const { success, data, error } = registerSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: error.message });
    }
    const { email, password, name } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
    });

    return res.status(201).json({
        message: "Signup successful",
        user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },
    });
};

export const login = async (req: Request, res: Response) => {
    const {success, data, error } = loginSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: error.message });
    }

    const { email, password } = data;


    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    if(! await bcrypt.compare(password, existingUser.password))
    {
        return res.status(401).json({ message: "Invaid password" });
    }

    return res.status(200).json({
        message: "Successfull",
        data: {
            token: token(email, existingUser.id)
        },
        user: {
            email: email,
            id: existingUser.id
        }
    })
};