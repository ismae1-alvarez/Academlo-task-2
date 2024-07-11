import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED" 
};

@Entity()
export class Repairs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id :  number;


    @Column()
    user_id  : number;

    @Column({
        type : "varchar",
        length  : 60,
        nullable :  false, 
    })
    date :  Date | string;

    @Column({
        type :"varchar",
        length : 60,
        nullable : false,
        unique: true
    })
    motor_number :string;

    @Column({
        type :"varchar",
        length : 200,
        nullable : false
    })
    description: string;


    @Column({
        type  :"enum",
        enum : Status,
        default :Status.PENDING
    })
    status :  Status | string;


    @CreateDateColumn()
    create_at : Date;

    @UpdateDateColumn()
    update_at : Date;
};