import cors from '@fastify/cors';
import "dotenv/config";
import Fastify from "fastify";
import { Auth, Comments, MarketItems, Posts, Users } from "./routes";

export const server = Fastify({
  logger: true,
});

server.register(cors, {
  origin: "*"
})

server.addHook("onRequest", (req, reply, done) => {
  req.log.info(
    { body: req.body, headers: req.headers, params: req.params },
    "received request",
  );
  done();
});

server.addHook("onSend", (req, reply, payload, done) => {
  req.log.info({ payload, statusCode: reply.raw.statusCode }, "response sent");
  done();
});

server.setErrorHandler((error, req, reply) => {
  reply.send(error);
});

server.get("/", (request, reply) => {
  return reply.send("Social Compass API");
});

server.register(Auth, { prefix: "/auth" });
server.register(Users, { prefix: "/users" });
server.register(Posts, { prefix: "/posts" });
server.register(Comments, { prefix: "/comments" });
server.register(MarketItems, { prefix: "/market" });

const port = parseInt(process.env.PORT || "3001");

server.listen({ port, host: "0.0.0.0" });
