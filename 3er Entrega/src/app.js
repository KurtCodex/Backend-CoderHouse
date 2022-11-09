// contiene toda la configuracion del servidor

import express from "express";
import morgan from "morgan"; // adhiere un nivel de verbosidad en los mensajes de feedback
import products from "./routes/products.routes.js";

const app = express();

app.set("port", 8080);

app.use(morgan("dev"));
app.use(products);

export { app };