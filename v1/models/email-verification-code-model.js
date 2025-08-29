import mongoose from "mongoose";

const emailVerificationCodeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    email: {
        type: String,
        required: true,
    },
    verificationCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '15m' // Expira em 15 minutos
    }
});

const EmailVerificationCode = mongoose.model("EmailVerificationCode", emailVerificationCodeSchema);

export default EmailVerificationCode;
