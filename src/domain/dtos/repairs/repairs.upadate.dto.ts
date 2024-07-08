export class RepairsUpadateDto{
    constructor(
        public readonly status :string,
    ){};

    static update(object:{[key:string]: any}):[string?, RepairsUpadateDto?]{
        const {status} =  object;

        if(!status) return ["Missing name", undefined];
        if(status !== "COMPLETED") return["El valor debe ser COMPLETED", undefined];

        return[undefined, new RepairsUpadateDto(status)];
    };
};