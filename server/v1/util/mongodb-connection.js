import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri, { dbName: "helpdesk_db" });

    } catch (err) {
        console.log(process.env.MONGODB_URI);
        process.exit(1); // Finaliza o processo em caso de erro
    }
};

export default connectDB;
