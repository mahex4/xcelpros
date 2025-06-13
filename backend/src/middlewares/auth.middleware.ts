import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer "))
        return res.status(401).json({ error: "No token" });
    const token = auth.split(" ")[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET!);
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
}

export interface AuthenticatedRequest extends Request {
    user?: { id: string };
}

export const requireAuth: RequestHandler = (req, res, next): void => {
    console.log('calling require auth');
    try {
        const token =
            req.cookies?.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            res.status(401).json({ error: "No token provided" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        (req as AuthenticatedRequest).user = { id: decoded.id };

        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized" });
    }
};
  
// export const requireAuth: RequestHandler = (req, res, next): void => {
//     console.log('🔵 [requireAuth] Middleware triggered');
//     try {
//         console.log('🔵 [requireAuth] Headers:', req.headers);
//         console.log('🔵 [requireAuth] Cookies:', req.cookies);

//         const token = req.header('Authorization')?.replace('Bearer ', '');

//         console.log('🔵 [requireAuth] Extracted token:', token);

//         if (!token) {
//             console.log('🔴 [requireAuth] No token provided');
//             res.status(401).json({ error: "No token provided" });
//             return;
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
//         console.log('🟢 [requireAuth] Decoded token:', decoded);

//         (req as AuthenticatedRequest).user = { id: decoded.id };
//         next();
//     } catch (err) {
//         console.log('🔴 [requireAuth] Error:', err);
//         res.status(401).json({ error: "Unauthorized" });
//     }
// };