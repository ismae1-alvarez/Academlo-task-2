import { Response, Request } from "express"
import { UserCreateUserDto, UserUpdateDto } from "../../domain"
import { UserServices } from "./users.services";

export class UserController {
    
    constructor(
        public readonly userServices :  UserServices
    ){};

    /**
     * Tenes que resolver esto
     * @param error 
     * @returns 
     */
    private getErrorMessage(error:unknown):string{
        if(error instanceof Error){
            return error.message
        };
        return String(error)
    };

    createUser = (req:Request, res:Response)=>{
        const [error, createUserDto] = UserCreateUserDto.create(req.body);

        if(error) return res.status(402).json(error);

        this.userServices.create(createUserDto!)
            .then(user => res.status(201).json(user))
            .catch((error: unknown) => res.status(400).json({messages : this.getErrorMessage(error)}));
    };

    getAllUsers = (_:Request, res: Response)=>{
        this.userServices.findAllUsers()
            .then(user=> res.status(200).json(user))
            .catch((error:unknown) => res.status(500).json({message : this.getErrorMessage(error)}));
    };

    getUserById = (req:Request, res :Response)=>{
        const {id} =  req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        this.userServices.findUserById(+id)
            .then(user=> res.status(201).json(user))
            .catch((error:unknown)=> res.status(500).json({message :  this.getErrorMessage(error)}))
    };

    updateUserById = (req:Request, res :Response)=>{
        const {id} =  req.params;
        const [error, updateUserDto] =  UserUpdateDto.update(req.body);

        if(error) return res.status(402).json(error);

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        this.userServices.updateUserById(+id, updateUserDto!)
            .then(updateUser=> res.status(200).json(updateUser))
            .catch((error: unknown)=> res.status(400).json({messages : this.getErrorMessage(error)}));
    };

    deleteUserById=(req:Request, res:Response)=>{
        const {id} =  req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        this.userServices.deleteUserById(+id)
            .then(userDelete => res.status(200).json(userDelete))
            .catch((error:unknown)=> res.status(500).json({message : this.getErrorMessage(error)}));

        
    };
};