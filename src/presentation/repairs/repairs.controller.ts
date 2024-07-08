import { Request, Response } from "express";
import { RepairsServices } from "./repairs.services";
import { RepairsCreateDto, RepairsUpadateDto } from "../../domain";
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
        this.repairsServices.getAllRepairs()
            .then(repairs => res.status(201).json(repairs))
            .catch((error:unknown)=> this.handleError(error, res))
    };

    getRepairsById = (req:Request, res:Response)=>{
        const {id} = req.params;
        
        if(isNaN(+id)) return res.status(400).json({message : "El is debe ser un numero"});

        this.repairsServices.getRepairsById(+id)
            .then(repairs => res.status(201).json(repairs))
            .catch((error:unknown)=> this.handleError(error, res));
    };

    updateRapairsById = (req:Request, res:Response)=>{
        const {id} =  req.params;
        const [error, RepairsUpdate] =  RepairsUpadateDto.update(req.body);

        if(error) return res.status(400).json({message : error});

        this.repairsServices.updateRepairById(RepairsUpdate!, +id)
            .then(repairs => res.status(201).json(repairs)) 
            .catch(error=> this.handleError(error, res));
    };

    deleteRepairsById = (req:Request, res:Response)=>{
        const {id} =  req.params;

        if(isNaN(+id)) return res.status(400).json({message : "El id debe ser un numero"});

        this.repairsServices.deleteRepairsById(+id)
            .then(repairs => res.status(201).json(repairs))
            .catch(error => this.handleError(error, res));
    };
};