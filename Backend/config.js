var config = {
  email: {},
};

config.puerto = 3000;
config.bd = "Ibero09";
config.secret = "tynhtfbgd";

config.email.host = "smtp.gmail.com";
config.email.port = 587;
config.email.user = "pruebasprogramacion08@gmail.com";
config.email.pass = "rokdlwapvxpysdjo";

config.listablanca = [
  "http://localhost:4200",
  "http://localhost:9876",
  "undefined",
];

http: module.exports.config = config;
