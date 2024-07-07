import { Repairs } from "../../data/postgres/models/repairs.model";
import { RepairsCreateDto } from "../../domain";

export class RepairsServices {
    constructor(){};


    async create(repairsData:RepairsCreateDto){
        const repairs = new Repairs();

        repairs.user_id =  repairsData.user_id;
        repairs.date =  repairs.date;

        return await repairs.save()
            .then(repairs => repairs)
            .catch(err =>  Promise.reject(err))
    };
};