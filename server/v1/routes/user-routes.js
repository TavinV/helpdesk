import express from "express";
const router = express.Router();

import userController from "../controllers/user-controller.js";
import { authenticateToken, authAndRole } from "../middleware/auth-middleware.js";

router.post("/", userController.createUser);

router.get("/", userController.getUsers);
router.get("/me", authenticateToken, userController.getLoggedUser);
router.get("/:id", userController.getUser);

router.put("/:id", authenticateToken, userController.updateUser);

router.delete("/:id", authenticateToken, userController.deleteUser);

export default router;
