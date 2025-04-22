const { text } = require("express");
var nodemailer = require("nodemailer");
const { config } = require("../../config.js");
var usuariosController = {};
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel;

usuariosController.Resgistar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password,
  };

  if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response.json({ state: false, mensaje: "el campo nombre es obligatorio" });
    return false;
  }
  if (post.email == undefined || post.email == null || post.email == "") {
    response.json({ state: false, mensaje: "el campo email es obligatorio" });
    return false;
  }
  if (
    post.password == undefined ||
    post.password == null ||
    post.password == ""
  ) {
    response.json({
      state: false,
      mensaje: "el campo password es obligatorio",
    });
    return false;
  }

  post.password = SHA256(post.password + config.secret);

  usuariosModel.Existe(post, function (ex) {
    if (ex.length == 0) {
      post.codigo = "G-" + Math.floor(Math.random() * (9999 - 1000) + 1000);

      const transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: false,
        requireTLS: true,
        auth: {
          user: config.email.user,
          pass: config.email.pass,
        },
      });

      var mailOptions = {
        from: config.email.user,
        to: post.email,
        subject: "verifica tu cuenta con el codigo: " + post.codigo,
        text:
          "Actica tu cuenta con este link, pegalo en tu navegador: http://localhost:3000/usuarios/activar/" +
          post.email +
          "/" +
          post.codigo,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(info);
        }
      });

      usuariosModel.Registar(post, function (res) {
        if (res.state == true) {
          response.json({
            state: true,
            mensaje: "Usuario Guardado Correctamente",
          });
        } else {
          response.json({
            state: false,
            mensaje: "error al guardar",
          });
        }
      });
    } else {
      response.json({
        state: false,
        mensaje: "El Email ya existe en la Base de Datos, intente con otro ",
      });
      return false;
    }
  });
};
usuariosController.ListarTodos = function (request, response) {
  usuariosModel.ListarTodos(null, function (respuesta) {
    response.json(respuesta);
  });
};

usuariosController.ListarUnico = function (request, response) {
  var post = {
    email: request.body.email,
  };

  if (post.email == undefined || post.email == null || post.email == "") {
    response.json({ state: false, mensaje: "el campo email es obligatorio" });
    return false;
  }

  usuariosModel.ListarUnico(post, function (respuesta) {
    response.json(respuesta);
  });
};

usuariosController.Actualizar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    email: request.body.email,
    estado: request.body.estado,
  };

  if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response.json({
      state: false,
      mensaje: "el campo nombre es obligatorio",
    });
    return false;
  }
  if (post.email == undefined || post.email == null || post.email == "") {
    response.json({ state: false, mensaje: "el campo email es obligatorio" });
    return false;
  }

  if (post.estado == undefined || post.estado == null || post.estado == "") {
    response.json({ state: false, mensaje: "el campo estado es obligatorio" });
    return false;
  }

  usuariosModel.Existe(post, function (ex) {
    if (ex.length == 0) {
      response.json({
        state: false,
        mensaje: "No podemos Actualizar un email que no Existe en la bd",
      });
      return false;
    } else {
      usuariosModel.Actualizar(post, function (respuesta) {
        if (respuesta.state == true) {
          response.json({
            state: true,
            mensaje: "Usuario actualizado correctamente",
          });
          return false;
        } else {
          response.json({
            state: false,
            mensaje: "Error al Actualizar",
            error: respuesta.error,
          });
          return false;
        }
      });
    }
  });
};

usuariosController.eliminar = function (request, response) {
  var post = {
    email: request.body.email,
  };

  if (post.email == undefined || post.email == null || post.email == "") {
    response.json({ state: false, mensaje: "el campo email es obligatorio" });
    return false;
  }

  usuariosModel.Existe(post, function (ex) {
    if (ex.length == 0) {
      response.json({
        state: false,
        mensaje: "No podemos Eliminar un email que no Existe en la bd",
      });
      return false;
    } else {
      usuariosModel.eliminar(post, function (respuesta) {
        if (respuesta.state == true) {
          response.json({
            state: true,
            mensaje: "Usuario Eliminado correctamente",
          });
          return false;
        }
      });
    }
  });
};

usuariosController.login = function (request, response) {
  var post = {
    email: request.body.email,
    password: request.body.password,
  };

  if (post.email == undefined || post.email == null || post.email == "") {
    response.json({ state: false, mensaje: "el campo email es obligatorio" });
    return false;
  }
  if (
    post.password == undefined ||
    post.password == null ||
    post.password == ""
  ) {
    response.json({
      state: false,
      mensaje: "el campo password es obligatorio",
    });
    return false;
  }

  post.password = SHA256(post.password + config.secret);

  usuariosModel.login(post, function (datos) {
    if (datos.length == 0) {
      response.json({
        state: false,
        mensaje: "Tus credenciales son Invalidas",
      });
      return false;
    } else {
      if (datos[0].estado == "Inactivo") {
        response.json({
          state: false,
          mensaje: "Cuenta Inactiva ve al correo y activa tu usuario",
        });
        return false;
      } else {
        response.json({
          state: true,
          mensaje: "Bienvenido: " + datos[0].nombre,
        });
        return false;
      }
    }
  });
};

usuariosController.activar = function (request, response) {
  var post = {
    email: request.params.email,
    codigo: request.params.codigo,
  };

  if (post.email == undefined || post.email == null || post.email == "") {
    response.json({ state: false, mensaje: "El campo email es obligatorio" });
    return false;
  }
  if (post.codigo == undefined || post.codigo == null || post.codigo == "") {
    response.json({ state: false, mensaje: "El codigo es obligatorio" });
    return false;
  }

  usuariosModel.activar(post, function (respuesta) {
    if (respuesta == null) {
      response.json({ state: false, mensaje: "No se pudo Activar la Cuenta" });
      return false;
    } else {
      response.json({
        state: true,
        mensaje: "Cuenta Activada, dirijase al Login",
      });
      return false;
    }
  });
};
module.exports.usuariosController = usuariosController;
