import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { registerSchema } from "../schemas/user.schema";
import { userRepository } from "../repositories/user.repository";
import { ZodError } from "zod";
import { MongoError } from "mongodb";
import dotenv from "dotenv";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
dotenv.config();

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log("🔵 [register] called");
        console.log("🔵 [register] body:", req.body);
        const validatedData = registerSchema.parse(req.body);
        const user = await userRepository.save({
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            password: validatedData.password,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });
        return res
            .status(201)
            .json({ message: "User registered successfully", token });
    } catch (error: unknown) {
        console.error("🔴 [register] error:", error);

        if (error instanceof MongoError && error.code === 11000) {
            return res.status(400).json({ error: "Email already in use" });
        }
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: "Validation failed",
                details: error.errors,
            });
        }
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = registerSchema
            .pick({ email: true, password: true })
            .parse(req.body);

        const user = await userRepository.findByEmail(email);

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });
        return res.json({ token });
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: "Validation failed",
                details: error.errors,
            });
        }
        next(error);
    }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
    console.log("🟢 /auth/me hit");
    try {
        const userId = (req as any).user?.id;

        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        
        const user = await userRepository.findById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const { _id, firstName, lastName, email } = user;
        res.json({ _id, firstName, lastName, email });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
  