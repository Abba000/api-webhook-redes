import express from "express";
import morgan from "morgan";

//routes
import languageRoutes from "./routes/language.routes";

const app=express();

//settings
app.set("port", 3000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/alumnos", languageRoutes);

export default app;