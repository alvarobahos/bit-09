var usuariosController =
  require("./api/controladores/usuariosController.js").usuariosController;

app.post("/usuarios/registrar", function (request, response) {
  usuariosController.Resgistar(request, response);
});

app.post("/usuarios/actualizar", function (request, response) {
  usuariosController.Actualizar(request, response);
});

app.post("/usuarios/eliminar", function (request, response) {
  usuariosController.eliminar(request, response);
});

app.get("/usuarios/ListarTodos", function (request, response) {
  usuariosController.ListarTodos(request, response);
});

app.post("/usuarios/ListarUnico", function (request, response) {
  usuariosController.ListarUnico(request, response);
});

app.post("/usuarios/login", function (request, response) {
  usuariosController.login(request, response);
});

app.get("/usuarios/activar/:email/:codigo", function (request, response) {
  usuariosController.activar(request, response);
});

var productosController =
  require("./api/controladores/productosController.js").productosController;

app.post("/productos/guardar", function (request, response) {
  productosController.Guardar(request, response);
});

app.post("/productos/actualizar", function (request, response) {
  productosController.Actualizar(request, response);
});

app.post("/productos/eliminar", function (request, response) {
  productosController.eliminar(request, response);
});

app.get("/productos/ListarTodos", function (request, response) {
  productosController.ListarTodos(request, response);
});

app.post("/productos/ListarId", function (request, response) {
  productosController.ListarId(request, response);
});

var serviciosController =
  require("./api/controladores/serviciosController.js").serviciosController;

app.post("/servicios/guardar", function (request, response) {
  serviciosController.Guardar(request, response);
});

app.post("/servicios/actualizar", function (request, response) {
  serviciosController.Actualizar(request, response);
});

app.post("/servicios/eliminar", function (request, response) {
  serviciosController.eliminar(request, response);
});

app.get("/servicios/ListarTodos", function (request, response) {
  serviciosController.ListarTodos(request, response);
});

app.post("/servicios/ListarId", function (request, response) {
  serviciosController.ListarId(request, response);
});
