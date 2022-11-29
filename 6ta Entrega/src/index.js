// punto de ejecucion del servidor
// contiene toda la configuracion del servidor
import express from "express";
import morgan from "morgan";
import products from "./routes/products.routes.js";
import { Server as HttpServer } from "http";
import { Server as serverIO } from "socket.io";

const app = express();
const httpServer = HttpServer(app);
const io = new serverIO(httpServer);

const mensajes = [
    { author: "Franco", text: "Hello world" }
]

io.on("connection", socket => {
    console.log("Client connection")

    socket.emit("messages", mensajes)
})


app.set("port", 8080);
app.set("view engine", "ejs");
app.set("views", "./src/views");


app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.static("views"));
app.use(products);




app.listen(app.get("port")); // escucha puerto, el puerto esta importado desde app

console.log("Server ready. Run on: ", app.get("port"));