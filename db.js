import mongoose from "mongoose";
import { mensajes } from "../libs/manejoErrores.js";
export async function conectarBD() {
    try {
        const respuesta=await mongoose.connect("mongodb://localhost:27017/appMongo");        
        return mensajes(200,"Bd conectada correctamente");
        
        
    } catch (error) {
        return mensajes(400,"Error al conectar la BD",error);
    }
}
