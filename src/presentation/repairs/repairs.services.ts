import { Repairs } from "../../data";
import { CustomError, RepairsCreateDto, RepairsUpadateDto } from "../../domain";
import { UserServices } from "../users/users.services";

enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED" 
};

export class RepairsServices {
    constructor(
        private readonly userServices : UserServices 
    ){};


    async create(repairsData:RepairsCreateDto){
        const repairs = new Repairs();
         await this.userServices.findUserById(repairsData.user_id);
        

        repairs.user_id =  repairsData.user_id;
        repairs.date =  repairsData.date;
        repairs.description =  repairsData.description;
        repairs.motor_number =  repairsData.motor_number;

        return await Repairs.findOne({
            where: {
                motor_number :  repairs.motor_number
            }
        })
            .then(motor  => {
                if(motor) return Promise.reject(CustomError.badRequest("Motor number alredy eisting"));

                return repairs.save();
            })
            .then((motor) => motor)
            .catch((error) => {
                return Promise.reject(error);
            });
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