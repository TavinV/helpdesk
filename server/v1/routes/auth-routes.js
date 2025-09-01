import express from "express";
const router = express.Router();

import authController from "../controllers/auth-controller.js";

router.post("/login", authController.loginUser);
router.post("/verify-email/request/:id", authController.requestEmailVerification);
router.post("/verify-email/confirm/:id", authController.verifyEmail);

export default router;
