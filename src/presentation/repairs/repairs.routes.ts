import { Router } from "express";
import { RepairsController } from "./repairs.controller";
import { RepairsServices } from "./repairs.services";
import { UserServices } from "../users/users.services";
import { envs } from "../../config";
import { EmailService } from "../users/email.service";
import { AuthMiddleware } from "../middleware/auth.middleware";

enum Role {
    CLIENT = "CLIENT",
    EMPLOYEE = "EMPLOYEE",
  }

export class RepairsRoutes {
    static get routes ():Router{
        const router =  Router();

        const emailServices =  new EmailService(
            envs.MAILER_SERVICE, 
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        );

        const userServices  = new UserServices(emailServices);
        const services =  new RepairsServices(userServices);
        const controller = new RepairsController(services); 

        // Middleware
        router.use(AuthMiddleware.protect);
        router.use(AuthMiddleware.restricTo(Role.EMPLOYEE));

        // Rotas portegidas
        router.get("/", controller.getAllRepairs);
        router.get("/:id", controller.getRepairsById);
        router.post("/", controller.createRepairs);
        router.patch("/:id", controller.updateRapairsById);
        router.delete("/:id", controller.deleteRepairsById);

        return router;
    };
};