import { Request, Response } from "express";
import { RepairsServices } from "./repairs.services";
import { RepairsCreateDto } from "../../domain";
import { CustomError } from "../../domain/errors/custom.errors";

export class RepairsController{
    constructor(
        public readonly  repairsServices : RepairsServices
    ){};

    private handleError =  (err:unknown, res:Response)=>{
        if(err instanceof CustomError){
            return res.status(err.statusCode).json({message:  err.message});
        };
        return res.status(500).json({message: 'Something went very wrong! 🧨'});
    };


    createRepairs = (req:Request, res:Response)=>{
        const [error, createRepairsDto] = RepairsCreateDto.create(req.body);

        if(error) return res.status(400).json({message :error});

        

        this.repairsServices.create(createRepairsDto!)
            .then(repair => res.status(200).json(repair))
            .catch((err:unknown)=> this.handleError(err, res))
    };

    getAllRepairs = (_:Request, res:Response)=>{
        console.log("Helllo")
    };

    getRepairsById = (req:Request, res:Response)=>{

    };

    updateRapairsById = (req:Request, res:Response)=>{

    };

    deleteRepairsById = (req:Request, res:Response)=>{

    };
};