import { Router } from "express";
import { UserController } from "./users.controllers";
import { UserServices } from "./users.services";
import { EmailService } from "./email.service";
import { envs } from "../../config";

export class UsersRoutes {
    static get routes ():Router{
        const router =  Router();

        const emailServices =  new EmailService(
            envs.MAILER_SERVICE, 
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        );
        const services =  new UserServices(emailServices);

        const controller = new UserController(services)

        router.get("/", controller.getAllUsers);
        router.get("/:id", controller.getUserById);
        router.post("/", controller.createUser);
        router.patch("/:id", controller.updateUserById);
        router.delete("/:id", controller.deleteUserById);
        router.post("/login", controller.loginUser)
        // login
        router.get("/validate-email/:token", controller.validateEmail);


        return router;
    };
};