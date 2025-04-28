import { Router } from "express";
import { register, login } from "../db/usuariosBD.js"; 
import User from "../models/usuarioModelo.js"; 
import { mensajes } from "../libs/manejoErrores.js"; 
import { adminAutorizado, cambiarPassword, usuarioAtorizado } from "../middlewares/funcionesPassword.js";

const router = Router();

router.post("/registro", async (req, res) => {
    try {
        const respuesta = await register(req.body); 
        res.cookie('token', respuesta.token).status(respuesta.status).json(respuesta);
    } catch (error) {
        res.status(500).json(mensajes(500, "Error al registrar el usuario", error));
    }
});

router.post("/login", async (req, res) => {
    try {
        const respuesta = await login(req.body); 
        res.status(respuesta.status).json(respuesta);
    } catch (error) {
        res.status(500).json(mensajes(500, "Error al iniciar sesión", error));
    }
});

router.get("/findUsuarios", async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json(mensajes(500, "Error al obtener los usuarios", error));
    }
});

router.get("/findUsuariosID", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findById(id);

        if (!usuario) {
            return res.status(404).json(mensajes(404, "Usuario no encontrado"));
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(mensajes(500, "Error al buscar el usuario", error));
    }
});

router.delete("/deleteUsuariosID", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findByIdAndDelete(id);

        if (!usuario) {
            return res.status(404).json(mensajes(404, "Usuario no encontrado"));
        }

        res.status(200).json(mensajes(200, "Usuario borrado correctamente"));
    } catch (error) {
        res.status(500).json(mensajes(500, "Error al borrar el usuario", error));
    }
});

router.put("/updateUsuariosID", async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const usuario = await User.findByIdAndUpdate(id, datosActualizados, {
            new: true,
            runValidators: true
        });

        if (!usuario) {
            return res.status(404).json(mensajes(404, "Usuario no encontrado"));
        }

        res.status(200).json(mensajes(200, "Usuario actualizado correctamente", usuario));
    } catch (error) {
        res.status(500).json(mensajes(500, "Error al actualizar el usuario", error));
    }
});

router.put("/cambiarTipoUsuario", async(req, res)=>{
    
});

export default router;
