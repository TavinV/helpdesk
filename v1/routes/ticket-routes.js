import express from "express";
const router = express.Router();

import ticketController from "../controllers/ticket-controller.js";
import { authAndRole } from "../middleware/auth-middleware.js";

router.post("/", authAndRole("user"), ticketController.createTicket);

router.get("/", ticketController.getTickets);
router.get("/:id", ticketController.getTicketById);

router.delete("/:id", authAndRole("user"), ticketController.deleteTicket);

router.patch("/accept/:id", authAndRole("technician"), ticketController.acceptTicket);
router.patch("/resolve/:id", authAndRole("technician"), ticketController.resolveTicket);

export default router;