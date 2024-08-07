import { Response, Request, NextFunction } from "express";
import { JwtAdapter } from "../../config";
import { User } from "../../data";

enum Role {
    CLIENT = "CLIENT",
    EMPLOYEE = "EMPLOYEE",
  }
enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export class AuthMiddleware {

    static async protect(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header("Authorization");
        if (!authorization) return res.status(401).json({ message: "No token provided" });
    
        if (!authorization.startsWith("Bearer")) return res.status(401).json({ message: "Invalid token" });
    
        const token = authorization.split(" ")[1] || "";
    
        try {
            const payload = await JwtAdapter.validateToken<{ id: number }>(token);
    
            if (!payload) return res.status(401).json({ message: "Invalid token" });
    
            const user = await User.findOne({
                where: {
                    id: payload.id,
                    status: Status.ACTIVE,
                    emailValidate: true
                }
            });
            if (!user) return res.status(401).json({ message: "Invalid user" });
    
            req.body.sessionUser = user;
            next();
    
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
    

    

    static restrictedAccess = (...roles: any) => {
        return (req: Request, res: Response, next: NextFunction) => {
          if (!roles.includes(req.body.sessionUser.role)) {
            return res
              .status(403)
              .json({ message: "You are not authorized to access this route" });
          }
          next();
        };
      };
};