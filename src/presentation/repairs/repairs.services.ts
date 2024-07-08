import { Repairs } from "../../data";
import { RepairsCreateDto, RepairsUpadateDto } from "../../domain";

enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED" 
};

export class RepairsServices {
    constructor(){};


    async create(repairsData:RepairsCreateDto){
        const repairs = new Repairs();

        repairs.user_id =  repairsData.user_id;
        repairs.date =  repairsData.date;

        return await repairs.save()
            .then(repairs => repairs)
            .catch(err =>  Promise.reject(err))
    };

    async getAllRepairs(){
        return await Repairs.find({
            where : {
                status : Status.PENDING
            }
        })
            .then(repair => repair)
            .catch( (erro : unknown)=>  Promise.reject(erro));
    };

    async getRepairsById(id:number){
        return await Repairs.findOne({
            where :{
                id
            }
        })
            .then(repairs => repairs)
            .catch(err => Promise.reject(err));
    };

    async updateRepairById(data:RepairsUpadateDto, id:number){
        const repair = await this.getRepairsById(id)

        repair!.status =  data.status.trim();

        repair?.save()
            .then(repair => repair)
            .catch(error => Promise.reject(error));
    };

    async deleteRepairsById(id:number){
        const repairs = await this.getRepairsById(id);

        repairs!.status =  Status.CANCELLED;

        return  repairs?.save()
            .then( repairs => repairs)
            .catch(error => Promise.reject(error));
    };
};