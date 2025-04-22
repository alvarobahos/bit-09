var productosModel = {};
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productosSchema = new Schema({
  nombre: String,
  codigo: String,
  estado: String,
});

const Mymodel = mongoose.model("productos", productosSchema);

productosModel.Guardar = function (post, callback) {
  const instancia = new Mymodel();
  instancia.nombre = post.nombre;
  instancia.codigo = post.codigo;
  instancia.estado = post.estado;

  instancia
    .save()
    .then((respuesta) => {
      return callback({ state: true });
    })
    .catch((error) => {
      return callback({ state: false, error: error });
    });
};

productosModel.ListarTodos = function (post, callback) {
  Mymodel.find({}, { nombre: 1, codigo: 1, estado: 1 })
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      console.log(error);
      return callback({ error: error });
    });
};

productosModel.ListarId = function (post, callback) {
  Mymodel.find({ _id: post.id }, { nombre: 1, codigo: 1 })
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      console.log(error);
      return callback({ error: error });
    });
};

productosModel.Existe = function (post, callback) {
  Mymodel.find({ _id: post.id })
    .then((respuesta) => {
      return callback(respuesta);
    })
    .catch((error) => {
      console.log(error);
      return callback({ error: error });
    });
};

productosModel.Actualizar = function (post, callback) {
  Mymodel.findOneAndUpdate(
    { _id: post.id },
    { nombre: post.nombre, estado: post.estado }
  )
    .then((respuesta) => {
      return callback({ state: true });
    })
    .catch((error) => {
      return callback({ state: false, error: error });
    });
};

productosModel.eliminar = function (post, callback) {
  Mymodel.findOneAndDelete({ _id: post.id })
    .then((respuesta) => {
      return callback({ state: true });
    })
    .catch((error) => {
      return callback({ state: false, error: error });
    });
};

module.exports.productosModel = productosModel;
