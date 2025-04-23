const productosController =
  require("./productosController.js").productosController;
const productosModel = require("../modelos/productosModel.js").productosModel;

jest.mock("../modelos/productosModel.js", () => {
  return {
    productosModel: {
      Guardar: jest.fn(),
      Existe: jest.fn(),
      ListarTodos: jest.fn(),
      ListarId: jest.fn(),
      Actualizar: jest.fn(),
      eliminar: jest.fn(),
    },
  };
});

describe("test de productos", () => {
  let request, response;

  beforeEach(() => {
    request = {
      body: {},
      query: {},
      params: {},
    };
    response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });
  describe("validar guardar", () => {
    test("debería pedir el codigo cuando falta", () => {
      request.body = {
        nombre: "prueba",
        estado: "activo",
      };

      productosController.Guardar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "el campo codigo es obligatorio",
      });
    });

    test("debería pedir el nombre cuando falta", () => {
      request.body = {
        codigo: "P123",
        estado: "activo",
      };

      productosController.Guardar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "el campo nombre es obligatorio",
      });
    });

    test("debería pedir el estado cuando falta", () => {
      request.body = {
        nombre: "alvaro",
        codigo: "P123",
      };

      productosController.Guardar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "el campo estado es obligatorio",
      });
    });

    test("Debería guardar producto exitosamente", () => {
      request.body = {
        nombre: "Paracetamol",
        codigo: "ABC123",
        estado: "activo",
      };

      productosModel.Existe.mockImplementation((post, cb) => cb([]));
      productosModel.Guardar.mockImplementation((post, cb) =>
        cb({ state: true })
      );

      productosController.Guardar(request, response);

      expect(productosModel.Guardar).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith({
        state: true,
        mensaje: "Elemento Guardado Correctamente",
      });
    });

    test("Debe rechazar si el código ya existe", () => {
      request.body = {
        nombre: "Paracetamol",
        codigo: "ABC123",
        estado: "activo",
      };

      productosModel.Existe.mockImplementation((post, cb) =>
        cb([{ id: "abc" }])
      );

      productosController.Guardar(request, response);

      expect(productosModel.Existe).toHaveBeenCalledWith(
        expect.objectContaining({ codigo: "ABC123" }),
        expect.any(Function)
      );
      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "El codigo del Elemento ya Existe, intente con otro ",
      });
    });
  });

  describe("Listar Id", () => {
    test("debería validar el Id", () => {
      productosController.ListarId(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "el campo id es obligatorio",
      });
    });
  });

  describe("validar Actualizar", () => {
    test("debería pedir el Id cuando falta", () => {
      request.body = {
        nombre: "prueba",
        estado: "activo",
      };

      productosController.Actualizar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "el campo id es obligatorio",
      });
    });

    test("debería pedir el nombre cuando falta", () => {
      request.body = {
        id: "prueba123",
        estado: "activo",
      };

      productosController.Actualizar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "el campo nombre es obligatorio",
      });
    });

    test("debería pedir el estado cuando falta", () => {
      request.body = {
        id: "prueba123",
        nombre: "alvaro",
      };

      productosController.Actualizar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "el campo estado es obligatorio",
      });
    });

    test("Actualiza producto exitosamente", () => {
      request.body = {
        id: "abc",
        nombre: "Pedro",
        estado: "activo",
      };
      productosModel.Existe.mockImplementation((post, cb) => cb(true));
      productosModel.Actualizar.mockImplementation((post, cb) =>
        cb({ state: true })
      );

      productosController.Actualizar(request, response);

      expect(productosModel.Actualizar).toHaveBeenCalledWith(
        expect.objectContaining({ id: "abc" }),
        expect.any(Function)
      );
      expect(response.json).toHaveBeenCalledWith({
        state: true,
        mensaje: "Elemento actualizado correctamente",
      });
    });

    test("No actualiza si el id no existe", () => {
      request.body = {
        id: "abc",
        nombre: "Pedro",
        estado: "activo",
      };
      productosModel.Existe.mockImplementation((post, cb) => cb([]));

      productosController.Actualizar(request, response);

      expect(productosModel.Actualizar).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "No podemos Actualizar un Id que no Existe en la bd",
      });
    });
  });

  describe("validar Elminar", () => {
    test("debería pedir el Id cuando falta", () => {
      productosController.eliminar(request, response);

      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "el campo Id es obligatorio",
      });
    });

    test("Eliminar producto exitosamente", () => {
      request.body.id = "xyz";
      productosModel.Existe.mockImplementation((post, cb) => cb(true));
      productosModel.eliminar.mockImplementation((post, cb) =>
        cb({ state: true })
      );

      productosController.eliminar(request, response);

      expect(productosModel.eliminar).toHaveBeenCalledWith(
        { id: "xyz" },
        expect.any(Function)
      );
      expect(response.json).toHaveBeenCalledWith({
        state: true,
        mensaje: "Elemento Eliminado correctamente",
      });
    });

    test("No elimina si el id no existe", () => {
      request.body = {
        id: "abc",
        nombre: "Pedro",
        estado: "activo",
      };
      productosModel.Existe.mockImplementation((post, cb) => cb([]));

      productosController.eliminar(request, response);

      expect(productosModel.eliminar).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith({
        state: false,
        mensaje: "No podemos Eliminar un Id que no Existe en la bd",
      });
    });
  });
});
