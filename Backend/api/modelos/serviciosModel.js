var serviciosModel = {};
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var serviciosSchema = new Schema({
  nombre: String,
  codigo: String,
});

const Mymodel = mongoose.model("servicios", serviciosSchema);

serviciosModel.Guardar = function (post, callback) {
  const instancia = new Mymodel();
  instancia.nombre = post.nombre;
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

serviciosModel.ListarTodos = function (post, callback) {
  Mymodel.find({}, { nombre: 1, codigo: 1 })
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      console.log(error);
      return callback({ error: error });
    });
};

serviciosModel.ListarId = function (post, callback) {
  Mymodel.find({ _id: post.id }, { nombre: 1, codigo: 1 })
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      console.log(error);
      return callback({ error: error });
    });
};

serviciosModel.Existe = function (post, callback) {
  Mymodel.find({ codigo: post.codigo })
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      console.log(error);
      return callback({ error: error });
    });
};

serviciosModel.Actualizar = function (post, callback) {
  Mymodel.findOneAndUpdate({ _id: post.id }, { nombre: post.nombre })
    .then((respuesta) => {
      return callback({ state: true });
    })
    .catch((error) => {
      return callback({ state: false, error: error });
    });
};

serviciosModel.eliminar = function (post, callback) {
  Mymodel.findOneAndDelete({ _id: post.id })
    .then((respuesta) => {
      return callback({ state: true });
    })
    .catch((error) => {
      return callback({ state: false, error: error });
    });
};

module.exports.serviciosModel = serviciosModel;
