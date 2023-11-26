import { FastifyServerOptions, HookHandlerDoneFunction } from "fastify";
import { AuthController } from "./controllers/authController";
import { CommentController } from "./controllers/commentsController";
import { PostController } from "./controllers/postsController";
import { UserController } from "./controllers/usersController";
import { AuthMiddleware } from "./middleware/auth";

const authController = new AuthController();
const userController = new UserController();
const postController = new PostController();
const commentController = new CommentController();

export function Auth(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.post("/login", authController.login);

  api.post("/register", authController.register);

  done();
}

export function Users(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.addHook("preHandler", AuthMiddleware);

  api.get("/", userController.getAll);

  api.get("/:id", userController.getByID);

  api.delete("/:id", userController.delete);

  done();
}

export function Posts(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.addHook("preHandler", AuthMiddleware);

  api.post("/", postController.create);

  api.get("/", postController.getAll);

  api.put("/:id", postController.update);

  api.delete("/:id", postController.delete);

  done();
}

export function Comments(
  api: any,
  opts: FastifyServerOptions,
  done: HookHandlerDoneFunction,
) {
  api.addHook("preHandler", AuthMiddleware);

  api.post("/", commentController.create);

  api.put("/:id", commentController.update);

  api.delete("/:id", commentController.delete);

  done();
}
