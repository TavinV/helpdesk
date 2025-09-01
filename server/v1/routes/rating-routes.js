import express from "express";
const router = express.Router();

import ratingController from "../controllers/rating-controller.js";
import { authAndRole } from "../middleware/auth-middleware.js";

router.get("/technician/:id", authAndRole("user"), ratingController.getRatingsByTechnicianId);
router.get("/:id", ratingController.getRatingById);
router.post("/:id", authAndRole("user"), ratingController.createRating);
router.delete("/:id", authAndRole("user"), ratingController.deleteRating);

export default router;