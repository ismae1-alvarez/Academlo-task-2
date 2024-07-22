import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { bcryptAdapter } from "../../../config";
import { Repairs } from "./repairs.model";



enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

enum Role {
    CLIENT = "CLIENT",
    EMPLOYEE  = "EMPLOYEE"
}


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id :  number;

    @Column({
        type : "varchar",
        length : 60,
        nullable : false,
    })
    name : string;

    @Column({
        type :  "varchar",
        length : 100, 
        nullable : false,
        unique : true,
    })
    email : string;

    @Column({
        type  :"varchar", 
        length : 255, 
        nullable :  false,
    })
    password  : string;

    @Column({
        type  : "enum",
        enum : Role,
        default : Role.CLIENT
    })
    role  : Role | string;

    @Column({
        type : "enum",
        enum  :Status,
        default : Status.ACTIVE,
    })
    status : Status;

    @OneToMany(()=> Repairs, (repairs)=> repairs.user)
    repairs : Repairs[]

    @CreateDateColumn()
    create_at : Date;

    @UpdateDateColumn()
    update_at : Date;

    @Column({
        type : "boolean",
        default :false
    })
    emailValidate :  boolean;

    @BeforeInsert()
    encryptPassword(){
        this.password =  bcryptAdapter.hash(this.password)
    };

    
};