import fastify from "fastify";
import { env } from "./config/env.config";
import { Authenticator } from "@fastify/passport";
import fastifyCookie from "@fastify/cookie";
import fastifySecureSession from "@fastify/secure-session";
import { connectToDatabase } from "./config/db.config";
import { readFileSync } from "fs";
import { join } from "path";

const server = fastify({
  logger: true,
});

const fastifyPassport = new Authenticator();

server.register(fastifyCookie);
server.register(fastifySecureSession, {
  sessionName: "session",
  cookieName: "auth_session",
  key: readFileSync(join(__dirname, "..", "secret-key")),
  secret: env.SESSION_SECRET,
  cookie: {
    path: "/",
  },
});

server.register(fastifyPassport.initialize());
server.register(fastifyPassport.secureSession());

server.post("/login", async (req, res) => {
  req.session.set("user", { username: "user" });
  res.send("login success!");
});

server.get("/register", async (req, res) => {
  req.session.set("user", { username: "user" });
  res.send("register success!");
});

server.get("/me", async (req, res) => {
  return req.session;
});

server.get("/me", async (req, res) => {
  return req.session;
});

server.get("/logout", function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

connectToDatabase();

server.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
