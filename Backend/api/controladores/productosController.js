var productosController = {};
var productosModel = require("../modelos/productosModel.js").productosModel;

productosController.Guardar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    codigo: request.body.codigo,
    estado: request.body.estado,
  };

  if (post.codigo == undefined || post.codigo == null || post.codigo == "") {
    response.json({ state: false, mensaje: "el campo codigo es obligatorio" });
    return false;
  }

  if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
    response.json({ state: false, mensaje: "el campo nombre es obligatorio" });
    return false;
  }

  if (post.estado == undefined || post.estado == null || post.estado == "") {
    response.json({ state: false, mensaje: "el campo estado es obligatorio" });
    return false;
  }

  productosModel.Existe(post, function (ex) {
    if (ex.length == 0) {
      productosModel.Guardar(post, function (res) {
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
productosController.ListarTodos = function (request, response) {
  productosModel.ListarTodos(null, function (respuesta) {
    response.json(respuesta);
  });
};

productosController.ListarId = function (request, response) {
  var post = {
    id: request.body.id,
  };

  if (post.id == undefined || post.id == null || post.id == "") {
    response.json({ state: false, mensaje: "el campo id es obligatorio" });
    return false;
  }

  productosModel.ListarId(post, function (respuesta) {
    response.json(respuesta);
  });
};

productosController.Actualizar = function (request, response) {
  var post = {
    nombre: request.body.nombre,
    estado: request.body.estado,
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

  if (post.estado == undefined || post.estado == null || post.estado == "") {
    response.json({
      state: false,
      mensaje: "el campo estado es obligatorio",
    });
    return false;
  }

  productosModel.Existe(post, function (ex) {
    if (ex.length == 0) {
      response.json({
        state: false,
        mensaje: "No podemos Actualizar un Id que no Existe en la bd",
      });
      return false;
    } else {
      productosModel.Actualizar(post, function (respuesta) {
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

productosController.eliminar = function (request, response) {
  var post = {
    id: request.body.id,
  };

  if (post.id == undefined || post.id == null || post.id == "") {
    response.json({ state: false, mensaje: "el campo Id es obligatorio" });
    return false;
  }

  productosModel.Existe(post, function (ex) {
    if (ex.length == 0) {
      response.json({
        state: false,
        mensaje: "No podemos Eliminar un Id que no Existe en la bd",
      });
      return false;
    } else {
      productosModel.eliminar(post, function (respuesta) {
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

module.exports.productosController = productosController;
