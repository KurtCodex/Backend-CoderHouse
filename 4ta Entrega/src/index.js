// punto de ejecucion del servidor

import { app } from "./app.js";

app.listen(app.get("port")); // escucha puerto, el puerto esta importado desde app

console.log("Server on port", app.get("port"));