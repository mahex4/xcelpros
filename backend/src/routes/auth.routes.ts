import { RequestHandler, Router } from "express";
import * as authController from "../controllers/auth.controller";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../middlewares/auth.middleware";
const router = Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too many requests from this IP, please try again after 15 minutes",
    },
});

router.post(
    "/register",
    authLimiter,
    (req, res, next) => {
        console.log("✅ Register route hit");
        next();
    },
    authController.register as RequestHandler
);

router.post("/login", authLimiter, authController.login as RequestHandler);

router.get("/me", requireAuth, authController.getMe);

export default router;
