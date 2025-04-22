var serviciosController = {};
var serviciosModel = require("../modelos/serviciosModel.js").serviciosModel;

serviciosController.Guardar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    codigo: request.body.codigo,
  };

  if (post.codigo == undefined || post.codigo == null || post.codigo == "") {
    response.json({ state: false, mensaje: "el campo codigo es obligatorio" });
    return false;
  }

  if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response.json({ state: false, mensaje: "el campo nombre es obligatorio" });
    return false;
  }

  serviciosModel.Existe(post, function (ex) {
    if (ex.length == 0) {
      serviciosModel.Guardar(post, function (res) {
        if (res.state == true) {
          response.json({
            state: true,
            mensaje: "Elemento Guardado Correctamente",
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
        mensaje: "El codigo del Elemento ya Existe, intente con otro ",
      });
      return false;
    }
  });
};
serviciosController.ListarTodos = function (request, response) {
  serviciosModel.ListarTodos(null, function (respuesta) {
    response.json(respuesta);
  });
};

serviciosController.ListarId = function (request, response) {
  var post = {
    id: request.body.id,
  };

  if (post.id == undefined || post.id == null || post.id == "") {
    response.json({ state: false, mensaje: "el campo id es obligatorio" });
    return false;
  }

  serviciosModel.ListarId(post, function (respuesta) {
    response.json(respuesta);
  });
};

serviciosController.Actualizar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    codigo: request.body.codigo,
    id: request.body.id,
  };

  if (post.id == undefined || post.id == null || post.id == "") {
    response.json({ state: false, mensaje: "el campo id es obligatorio" });
    return false;
  }
  if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response.json({
      state: false,
      mensaje: "el campo nombre es obligatorio",
    });
    return false;
  }
  if (post.codigo == undefined || post.codigo == null || post.codigo == "") {
    response.json({
      state: false,
      mensaje: "el campo codigo es obligatorio",
    });
    return false;
  }

  serviciosModel.Existe(post, function (ex) {
    if (ex.length == 0) {
      response.json({
        state: false,
        mensaje: "No podemos Actualizar un Id que no Existe en la bd",
      });
      return false;
    } else {
      serviciosModel.Actualizar(post, function (respuesta) {
        if (respuesta.state == true) {
          response.json({
            state: true,
            mensaje: "Elemento actualizado correctamente",
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

serviciosController.eliminar = function (request, response) {
  var post = {
    id: request.body.id,
  };

  if (post.id == undefined || post.id == null || post.id == "") {
    response.json({ state: false, mensaje: "el campo Id es obligatorio" });
    return false;
  }

  serviciosModel.Existe(post, function (ex) {
    if (ex.length == 0) {
      response.json({
        state: false,
        mensaje: "No podemos Eliminar un Id que no Existe en la bd",
      });
      return false;
    } else {
      serviciosModel.eliminar(post, function (respuesta) {
        if (respuesta.state == true) {
          response.json({
            state: true,
            mensaje: "Elemento Eliminado correctamente",
          });
          return false;
        }
      });
    }
  });
};

module.exports.serviciosController = serviciosController;
