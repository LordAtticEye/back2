/*function textoError(mensaje) {
    //console.log(error);
    var mensajeUsuario, mensajeOriginal;

    switch (mensaje) {
        case "Registro agregado":
            mensajeUsuario = "Registro agregado correctamente";
            mensajeOriginal = "Registro agregado correctamente";
            break;
        case "Usuario ya existente":
            mensajeUsuario = "El usuario ya existe";
            mensajeOriginal = "Usuario ya existente";
            break;
        case "Email ya existente":
            mensajeUsuario = "El email ya existe";
            mensajeOriginal = "Email ya existente";
            break;
        case "Acceso Permitido":
            mensajeUsuario = "Datos correctos";
            mensajeOriginal = "Acceso Permitido";
            break;
        case "Datos incorrectos":
            mensajeUsuario = "Datos incorrectos";
            mensajeOriginal = "Datos incorrectos";
            break;
        default:
            mensajeUsuario = "Error desconocido";
            mensajeOriginal = mensaje;
    }
    if (mensaje == "MongooseError: Operation users.insertOne() buffering timed out after 10000ms") {
        mensajeUsuario = "Error al guardar el registro";
        mensajeOriginal = "MongooseError: Operation `users.insertOne()";
    }
    return {
        mensajeUsuario,
        mensajeOriginal
    }
}
*/
export function mensajes(status, mensajeUsuario, mensajeOriginal="",token="") {
    return {
        status,
        mensajeUsuario,
        mensajeOriginal,
        token
    }
}