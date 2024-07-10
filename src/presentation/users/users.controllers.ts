import { Response, Request } from "express"
import { CustomError, UserCreateUserDto, UserLoginDto, UserUpdateDto } from "../../domain"
import { UserServices } from "./users.services";
import { send } from "process";

export class UserController {
    
    constructor(
        public readonly userServices :  UserServices
    ){};

    /**
     * Tenes que resolver esto
     * @param error 
     * @returns 
     */
    private getErrorMessage =(error:unknown, res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:  error.message});
        };
        return res.status(500).json({message: 'Something went very wrong! 🧨'});
    };

    createUser = (req:Request, res:Response)=>{
        const [error, createUserDto] = UserCreateUserDto.create(req.body);

        if(error) return res.status(422).json(error);

        this.userServices.create(createUserDto!)
            .then(user => res.status(200).json(user))
            .catch((error: unknown) => this.getErrorMessage(error, res));
    };

    loginUser =(req:Request, res:Response)=>{
        const [error, loginUserDto] = UserLoginDto.login(req.body);
        
        if(error) return res.status(422).json(error);


    };  

    validateEmail =(req:Request, res:Response)=>{
        const {token} =  req.params;
        this.userServices.validateEmail(token)
            .then(()=> res.json("Email validated preporty"))
            .catch(err=>this.getErrorMessage(err, res));
    };

    getAllUsers = (_:Request, res: Response)=>{
        this.userServices.findAllUsers()
            .then(user=> res.status(200).json(user))
            .catch((error: unknown) => this.getErrorMessage(error, res));
    };

    getUserById = (req:Request, res :Response)=>{
        const {id} =  req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        this.userServices.findUserById(+id)
            .then(user=> res.status(201).json(user))
            .catch((error: unknown) => this.getErrorMessage(error, res));
    };

    updateUserById = (req:Request, res :Response)=>{
        const {id} =  req.params;
        const [error, updateUserDto] =  UserUpdateDto.update(req.body);

        if(error) return res.status(402).json(error);

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        this.userServices.updateUserById(+id, updateUserDto!)
            .then(updateUser=> res.status(200).json(updateUser))
            .catch((error: unknown) => this.getErrorMessage(error, res));
    };

    deleteUserById=(req:Request, res:Response)=>{
        const {id} =  req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        this.userServices.deleteUserById(+id)
            .then(userDelete => res.status(200).json(userDelete))
            .catch((error: unknown) => this.getErrorMessage(error, res));
    };


};