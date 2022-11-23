// contiene toda la configuracion del servidor

import express from "express";
import morgan from "morgan";
import products from "./routes/products.routes.js";

const app = express();

app.set("port", 8080);
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.static("public"));

app.use(products);

export { app };