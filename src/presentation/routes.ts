import { Router } from "express";
import { RepairsRoutes } from "./repairs/repairs.routes";
import { UsersRoutes } from "./users/users.routes";

export class AppRoutes {
    static get routes():Router{
        const routes = Router();


        routes.use("/api/v1/users/", UsersRoutes.routes);

        routes.use("/api/v1/repairs/", RepairsRoutes.routes);



        return routes;
    }
}