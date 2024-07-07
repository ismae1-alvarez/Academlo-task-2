import { Router } from "express";
import { RepairsController } from "./repairs.controller";
import { RepairsServices } from "./repairs.services";

export class RepairsRoutes {
    static get routes ():Router{
        const router =  Router();


        const services =  new RepairsServices()
        const controller = new RepairsController(services); 

        router.get("/", controller.getAllRepairs);
        router.get("/:id", controller.getRepairsById);
        router.post("/", controller.createRepairs);
        router.patch("/:id", controller.updateRapairsById);
        router.delete("/:id", controller.deleteRepairsById);

        return router;
    };
};