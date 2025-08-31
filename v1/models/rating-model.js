import mongoose from "mongoose";

const rating = mongoose.Schema({
    ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    user_name: { type: String, required: true },
    technician_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, maxlength: 500 }
})

export default mongoose.model("Rating", rating);