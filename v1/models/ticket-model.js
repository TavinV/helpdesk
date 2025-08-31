import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["open", "in_progress", "closed"], default: "open" },
    attemptedSolutions: { type: [String], default: [] },
    additionalInfo: { type: String, default: "" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    technician_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    solution: { type: String, default: null },
    ratingId: { type: mongoose.Schema.Types.ObjectId, ref: "Rating", default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
