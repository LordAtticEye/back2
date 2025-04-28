import crypto from "crypto";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { mensajes } from "../libs/manejoErrores";

export function encriptarPassword(password){
    const salt= crypto.randomBytes(32).toString("hex");
    const hash = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    return{
        salt,
        hash
    }
}

export function validarPassword(password, salt, hash){
    const hashEvaluar = crypto.scryptSync(password, salt, 10, 64, "sha512").toString("hex");
    return hashEvaluar == hash;
}

export function usuarioAtorizado(req, res, next){
    const token = req.cookies.token;
    if (!token){
        return mensajes(400,"Usuario no autorizado- token");
    }
    jwt.verify(token,process.env.SECRET_TOKEN,(error, usuario)=>{
        if(error){
            return mensajes(400, "Usuario no autorizado - token no valido");
        }
        req.usuario=usuario;
    })
    return mensajes(200, "Usuario autorizado");
};

export async function adminAutorizado(req){
    //console.log("usuario -----");
    const respuesta= await usuarioAtorizado(req.cookies.token, req)
    if (respuesta.status!=200){
        return mensajes(400, "Admin no autorizado");
    }
    const usuario = await buscarUsuarioPorID(req.usuario.id);
    if(usuario.tipoUsuario!="admin"){
        return mensajes(400, "Admin no autorizado");
    }
    return mensajes(200,"Admin autorizado");
};


