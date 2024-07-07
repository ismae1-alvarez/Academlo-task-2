import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



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
    name : string

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


    @CreateDateColumn()
    create_at : Date;

    @UpdateDateColumn()
    update_at : Date;
}