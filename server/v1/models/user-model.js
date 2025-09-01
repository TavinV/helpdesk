import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    cpf: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "technician"], default: "user" },
    password: { type: String, required: true },
    phone: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
