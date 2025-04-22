var usuariosModel = {};
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuariosSchema = new Schema({
  nombre: String,
  email: String,
  password: String,
  estado: String,
  codigo: String,
});

const Mymodel = mongoose.model("usuarios", usuariosSchema);

usuariosModel.Registar = function (post, callback) {
  const instancia = new Mymodel();
  instancia.nombre = post.nombre;
  instancia.email = post.email;
  instancia.password = post.password;
  instancia.estado = "Inactivo";
  instancia.codigo = post.codigo;

  instancia
    .save()
    .then((respuesta) => {
      return callback({ state: true });
    })
    .catch((error) => {
      return callback({ state: false, error: error });
    });
};

usuariosModel.ListarTodos = function (post, callback) {
  Mymodel.find({}, { nombre: 1, email: 1, estado: 1 })
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      console.log(error);
      return callback({ error: error });
    });
};

usuariosModel.ListarUnico = function (post, callback) {
  Mymodel.find({ email: post.email }, { nombre: 1, email: 1, estado: 1 })
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      console.log(error);
      return callback({ error: error });
    });
};

usuariosModel.Existe = function (post, callback) {
  Mymodel.find({ email: post.email })
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      console.log(error);
      return callback({ error: error });
    });
};

usuariosModel.Actualizar = function (post, callback) {
  Mymodel.findOneAndUpdate(
    { email: post.email },
    { nombre: post.nombre, estado: post.estado }
  )
    .then((respuesta) => {
      return callback({ state: true });
    })
    .catch((error) => {
      return callback({ state: false, error: error });
    });
};

usuariosModel.eliminar = function (post, callback) {
  Mymodel.findOneAndDelete({ email: post.email })
    .then((respuesta) => {
      return callback({ state: true });
    })
    .catch((error) => {
      return callback({ state: false, error: error });
    });
};

usuariosModel.login = function (post, callback) {
  Mymodel.find({ email: post.email, password: post.password }, { password: 0 })
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      return callback({ error: error });
    });
};

usuariosModel.activar = function (post, callback) {
  Mymodel.findOneAndUpdate(
    { email: post.email, codigo: post.codigo },
    { estado: "Activado" }
  )
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      return callback({ error: error });
    });
};
module.exports.usuariosModel = usuariosModel;
