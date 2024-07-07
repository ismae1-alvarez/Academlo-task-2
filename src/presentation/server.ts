import express, { Router } from "express";

interface Option {
    port : number;
    routes :  Router;
};

export class Server {
    public readonly app =  express();
    private readonly port :  number;
    private readonly routes :  Router;
    
    constructor (option: Option){
        this.port =  option.port;
        this.routes =  option.routes;
    }

    async start(){
        // midelware 
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));

        this.app.use(this.routes);

        this.app.listen(this.port, ()=>{
            console.log(`Server is running on port : ${this.port}`)
        })        
    }
};
