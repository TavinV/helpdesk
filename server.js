import app from "./v1/app.js";
import connectDB from "./v1/util/mongodb-connection.js";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
});
